import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Tema não fornecido." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Chave da API não configurada no servidor." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `Você é um pregador e teólogo magistral, especializado em homilética cristã erudita com foco na tradição das Assembleias de Deus (pentecostal clássica).
Crie um esboço detalhado de sermão baseado no seguinte tema ou texto bíblico: "${topic}".

O esboço deve conter:
1. **Título Criativo e Impactante**
2. **Introdução:** Gancho, contexto e a Grande Ideia do sermão.
3. **Corpo do Sermão:** 3 pontos principais, cada um com:
   - Uma sub-divisão clara.
   - Referência bíblica de apoio.
   - Uma breve aplicação prática.
4. **Conclusão:** Resumo e um apelo espiritual focado na prática da fé.

[Instruções de Formatação:]
- Use Markdown para estruturar a resposta.
- Use **Negrito** para pontos principais.
- Mantenha um tom solene, biblicocêntrico e inspirador.
- Responda em Português do Brasil.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message.content || "";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Erro na API de geração de sermão:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao gerar o esboço. Tente novamente." },
      { status: 500 }
    );
  }
}
