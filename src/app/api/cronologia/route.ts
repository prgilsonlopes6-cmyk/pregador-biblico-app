import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { era } = await req.json();

    if (!era) {
      return NextResponse.json({ error: "Era não fornecida." }, { status: 400 });
    }

    // Prioridade para a chave do usuário enviada no cabeçalho
    const userApiKey = req.headers.get("x-gemini-key");
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Chave da API não configurada. Por favor, insira sua chave nas configurações (ícone de engrenagem)." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Você é um historiador e erudito bíblico. Sua tarefa é fornecer uma lista cronológica de eventos principais para a era bíblica: "${era}".

Responda ESTRITAMENTE em formato JSON com a seguinte estrutura:
{
  "era": "Nome da Era",
  "summary": "Breve resumo teológico e histórico desta era",
  "events": [
    {
      "date": "Ano aproximado (ex: 1446 a.C. ou 30 d.C.)",
      "title": "Título do Evento",
      "description": "Explicação breve do que ocorreu",
      "characters": ["Personagem 1", "Personagem 2"],
      "significance": "Importância teológica para a redenção"
    }
  ]
}

Forneça entre 5 e 8 eventos principais, em ordem cronológica correta.
A resposta deve ser APENAS o JSON, sem markdown ou explicações externas.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Remove markdown code blocks if present
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro na API de Cronologia:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao buscar a cronologia. Tente novamente." },
      { status: 500 }
    );
  }
}
