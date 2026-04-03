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

    const prompt = `Você é um dicionário teológico profundamente fundamentado na teologia cristã e na tradição da Assembleia de Deus.
Forneça a definição, origem (hebraico/grego se aplicável), referências bíblicas e o significado teológico da seguinte palavra: "${word}".
O formato da resposta deve ser em Markdown, claro, acadêmico e acessível. Crie títulos e estruturação adequada.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message.content || "";

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Erro na API de dicionário:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao gerar a definição. Tente novamente." },
      { status: 500 }
    );
  }
}
