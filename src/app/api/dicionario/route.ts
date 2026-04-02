import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { word } = await req.json();

    if (!word) {
      return NextResponse.json({ error: "Palavra não fornecida." }, { status: 400 });
    }

    // Prioridade para a chave do usuário enviada no cabeçalho
    const userApiKey = req.headers.get("x-gemini-key");
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Chave da API não configurada. Por favor, insira sua chave nas configurações (ícone de engrenagem)." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey as string);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Você é um dicionário teológico profundamente fundamentado na teologia cristã e na tradição da Assembleia de Deus.
Forneça a definição, origem (hebraico/grego se aplicável), referências bíblicas e o significado teológico da seguinte palavra: "${word}".
O formato da resposta deve ser em Markdown, claro, acadêmico e acessível. Crie títulos e estruturação adequada.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Erro na API de dicionário:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao gerar a definição. Tente novamente." },
      { status: 500 }
    );
  }
}
