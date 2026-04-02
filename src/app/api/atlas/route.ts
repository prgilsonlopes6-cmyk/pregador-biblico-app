import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { location } = await req.json();

    if (!location) {
      return NextResponse.json({ error: "Localização não fornecida." }, { status: 400 });
    }

    // Prioridade para a chave do usuário enviada no cabeçalho
    const userApiKey = req.headers.get("x-gemini-key");
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Chave da API não configurada. Por favor, insira sua chave nas configurações (ícone de engrenagem)." }, { status: 500 });
    }

    // Usando exatamente o mesmo padrão estável da rota de enciclopédia
    const genAI = new GoogleGenerativeAI(apiKey as string);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Você é um geógrafo bíblico de profunda erudição cristã.
Forneça um estudo geográfico e histórico detalhado em formato JSON sobre o local ou região: "${location}".

IMPORTANTE: Responda APENAS com o objeto JSON abaixo, sem qualquer texto fora dele:
{
  "name": "Nome do Local ou Região",
  "meaning": "Significado do nome",
  "description": "História bíblica e descrição geográfica bem detalhada",
  "coordinates": { "lat": 0.0, "lng": 0.0 },
  "physical_geography": {
    "relief": "Montanhas, vales e relevo físico",
    "climate": "Clima, chuvas e flora na era bíblica",
    "waters": "Rios, fontes, lagos ou mares próximos"
  },
  "strategic_importance": "Importância comercial, militar ou política no mundo antigo",
  "events": [
    { "event": "Acontecimento Marcante", "reference": "Capítulo/Verso", "description": "Fato ocorrido aqui" }
  ],
  "theological_insight": "Breve lição ou reflexão teológica espiritual",
  "image_search_term": "Termo para busca de imagem em inglês"
}
Seja preciso com as coordenadas geográficas para uso em mapas.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    let data;
    // Extrai apenas o bloco JSON caso a IA escreva texto extra por engano
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
       console.error("ERRO: IA não retornou JSON estruturado.", text);
       throw new Error("A Inteligência Artificial não retornou dados válidos.");
    }
    
    try {
      data = JSON.parse(jsonMatch[0].trim());
    } catch (e) {
      console.error("ERRO: Falha ao converter resposta em JSON.", jsonMatch[0]);
      throw new Error("Erro ao converter os dados da geografia.");
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("ERRO CRÍTICO API ATALAS:", error.message || error);
    return NextResponse.json(
      { error: "Erro técnico: " + (error.message || "Tente novamente.") },
      { status: 500 }
    );
  }
}
