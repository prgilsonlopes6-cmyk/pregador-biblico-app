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

    const prompt = `Você é um enciclopedista teológico abrangente e erudito, fundamentado na tradição da Assembleia de Deus.
Forneça um artigo enciclopédico detalhado sobre o seguinte tema bíblico/teológico: "${topic}".
Inclua:
- Contexto histórico e cultural
- Significado teológico
- Principais passagens bíblicas relacionadas
- Aplicação prática ou importância para a igreja moderna
Formate a resposta em Markdown bem estruturado, com títulos e listas se necessário.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message.content || "";

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Erro na API de enciclopédia:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao gerar o artigo. Tente novamente." },
      { status: 500 }
    );
  }
}
