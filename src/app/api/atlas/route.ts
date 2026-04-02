import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { location } = await req.json();

    if (!location) {
      return NextResponse.json({ error: "Localização não fornecida." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Chave da API não configurada." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Você é um geógrafo bíblico e historiador renomado, especializado na tradição cristã.
Sua tarefa é fornecer informações detalhadas sobre a localização ou região bíblica: "${location}".

Responda ESTRITAMENTE em formato JSON com a seguinte estrutura:
{
  "name": "Nome da Localidade ou Região",
  "meaning": "Significado do nome, se conhecido",
  "description": "Descrição geográfica e histórica detalhada",
  "coordinates": {
    "lat": 0.000000,
    "lng": 0.000000
  },
  "physical_geography": {
    "relief": "Descrição do relevo (montanhas, vales, cluse)",
    "climate": "Descrição do clima e vegetação na época bíblica",
    "waters": "Principais rios, fontes ou mares próximos"
  },
  "strategic_importance": "Explicação da importância militar, comercial ou política deste lugar no mundo bíblico",
  "events": [
    {
      "event": "Nome do Evento",
      "reference": "Referência Bíblica",
      "description": "Explicação breve do que ocorreu"
    }
  ],
  "theological_insight": "Uma breve reflexão teológica sobre este lugar",
  "image_search_term": "Termo de busca em inglês para encontrar uma imagem histórica ou geográfica relevante deste lugar"
}

Se for uma região ampla (ex: Galiléia), forneça coordenadas centrais. Certifique-se de que as informações sejam precisas biblicamente.
A resposta deve ser APENAS o JSON, sem markdown ou explicações externas.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Busca o bloco JSON dentro da resposta (entre as primeiras { e última })
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Não foi possível encontrar JSON na resposta da IA:", text);
      throw new Error("Resposta da IA inválida");
    }
    
    const data = JSON.parse(jsonMatch[0]);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro na API do Atlas Bíblico:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao buscar informações do Atlas. Tente novamente." },
      { status: 500 }
    );
  }
}
