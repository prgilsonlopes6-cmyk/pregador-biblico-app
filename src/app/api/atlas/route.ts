import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

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
    
    // Voltando para o método simples e estável que funciona nas outras rotas
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Você é um geógrafo bíblico e historiador renomado.
Forneça informações detalhadas sobre: "${location}".

RESPONDA ESTRITAMENTE NO FORMATO JSON ABAIXO:
{
  "name": "Nome",
  "meaning": "Significado",
  "description": "Descrição",
  "coordinates": {"lat": 0, "lng": 0},
  "physical_geography": {"relief": "...", "climate": "...", "waters": "..."},
  "strategic_importance": "...",
  "events": [{"event": "...", "reference": "...", "description": "..."}],
  "theological_insight": "...",
  "image_search_term": "..."
}
Não escreva nada fora do JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let data;
    try {
      // Tenta tirar o JSON do meio de qualquer texto que venha
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        data = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("JSON não encontrado");
      }
    } catch (e) {
      console.error("Falha ao parsear resposta da IA:", text);
      throw new Error("Erro de formatação na resposta da IA.");
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Erro crítico na API do Atlas:", error);
    return NextResponse.json(
      { error: "Erro de conexão ou busca: " + (error.message || "Tente novamente.") },
      { status: 500 }
    );
  }
}
