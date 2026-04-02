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
    
    // Configura o esquema de resposta JSON
    const schema: any = {
      type: SchemaType.OBJECT,
      properties: {
        name: { type: SchemaType.STRING, description: "Nome exato da localidade bíblica" },
        meaning: { type: SchemaType.STRING, description: "Significado do nome em hebraico/grego" },
        description: { type: SchemaType.STRING, description: "História e descrição geral" },
        coordinates: {
          type: SchemaType.OBJECT,
          properties: {
            lat: { type: SchemaType.NUMBER },
            lng: { type: SchemaType.NUMBER }
          },
          required: ["lat", "lng"]
        },
        physical_geography: {
          type: SchemaType.OBJECT,
          properties: {
            relief: { type: SchemaType.STRING, description: "Montanhas, vales e planícies" },
            climate: { type: SchemaType.STRING, description: "Clima, chuvas e vegetação" },
            waters: { type: SchemaType.STRING, description: "Rios, lagos ou mares próximos" }
          },
          required: ["relief", "climate", "waters"]
        },
        strategic_importance: { type: SchemaType.STRING, description: "Importância comercial ou militar" },
        events: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              event: { type: SchemaType.STRING },
              reference: { type: SchemaType.STRING },
              description: { type: SchemaType.STRING }
            },
            required: ["event", "reference", "description"]
          }
        },
        theological_insight: { type: SchemaType.STRING },
        image_search_term: { type: SchemaType.STRING }
      },
      required: ["name", "meaning", "description", "coordinates", "physical_geography", "strategic_importance", "events", "theological_insight", "image_search_term"]
    };

    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const prompt = `Você é um geógrafo bíblico e historiador renomado.
Forneça informações geográficas bíblicas profundas sobre: "${location}".
Use fontes acadêmicas e teológicas precisas. Responda apenas com o JSON estruturado.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let data;
    try {
      // Tenta parse direto (Ideal para Response Schema)
      data = JSON.parse(text);
    } catch (parseError) {
      // Fallback: Busca o bloco JSON no texto (Caso o modelo não suporte Schema ou anexe texto)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          data = JSON.parse(jsonMatch[0]);
        } catch (innerError) {
          console.error("Falha ao parsear JSON extraído:", jsonMatch[0]);
          throw innerError;
        }
      } else {
        console.error("Texto recebido da IA sem JSON:", text);
        throw new Error("Formato de resposta inválido");
      }
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Erro crítico na API do Atlas Bíblico:", error.message || error);
    return NextResponse.json(
      { error: "Erro na IA: " + (error.message || "Tente novamente.") },
      { status: 500 }
    );
  }
}
