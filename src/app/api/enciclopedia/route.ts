import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Tópico não fornecido." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Chave da API não configurada no servidor." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `Você é um historiador e teólogo bíblico magistral, professor em um seminário das Assembleias de Deus.
Forneça informações detalhadas sobre o tópico bíblico: "${topic}".

[Sua resposta OBRIGATORIAMENTE deve conter formatação Markdown clara e ser organizada em seções:]
1. **Visão Geral:** Resumo do que é o tópico.
2. **Contexto Histórico e Geográfico:** Quando e onde ocorreu, ou detalhes sobre o local/objeto.
3. **Importância Bíblica e Teológica:** Qual o papel deste tópico na narrativa bíblica.
4. **Curiosidades e Arqueologia:** Descobertas ou fatos interessantes relacionados.
5. **Aplicação Prática/Sermonária:** Uma lição que pode ser extraída para a igreja hoje.

Mantenha um tom solene, informativo e profundamente bíblico.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message.content || "";
    // Limpeza de possíveis blocos de código markdown desnecessários
    const cleanText = text.replace(/```markdown|```/g, "").trim();

    return NextResponse.json({ result: cleanText });
  } catch (error: any) {
    console.error("Erro detalhado na API de enciclopédia:", error);
    return NextResponse.json(
      { error: "Erro ao processar pesquisa enciclopédica. Verifique sua chave da OpenAI." },
      { status: 500 }
    );
  }
}
