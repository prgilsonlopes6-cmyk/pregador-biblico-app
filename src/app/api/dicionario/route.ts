import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { word } = await req.json();

    if (!word) {
      return NextResponse.json({ error: "Palavra não fornecida." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Chave da API não configurada no servidor." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `Você é um dicionário teológico erudito especializado na tradição cristã reformada e pentecostal (Assembleia de Deus).
Forneça a definição teológica da palavra ou termo: "${word}".

[Sua resposta OBRIGATORIAMENTE deve conter formatação Markdown clara:]
1. **Termo e Etimologia:** Significado original (Grego/Hebraico se aplicável) e transliteração.
2. **Definição Teológica:** Explicação profunda do conceito.
3. **Perspectiva Pentecostal/Assembleiana:** Como este termo é entendido ou enfatizado na tradição das Assembleias de Deus.
4. **Referências Bíblicas:** Cite 2 ou 3 versículos-chave onde o conceito aparece.

Seja acadêmico, mas acessível para pastores e estudantes da Bíblia.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message.content || "";

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Erro na API de dicionário:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao processar a definição teológica. Tente novamente." },
      { status: 500 }
    );
  }
}
