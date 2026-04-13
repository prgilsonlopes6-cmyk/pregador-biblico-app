import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { location } = await req.json();

    if (!location) {
      return NextResponse.json({ error: "Localização não fornecida." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Chave da API não configurada no servidor." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    const systemPrompt = `Você é um geógrafo e historiador bíblico especialista. 
Sua tarefa é fornecer informações detalhadas e estruturadas em JSON sobre um local ou região bíblica solicitada.

O JSON deve seguir EXATAMENTE esta estrutura:
{
  "name": "Nome do Lugar em Português",
  "meaning": "Significado teológico ou etimológico do nome",
  "description": "Uma descrição histórica e geográfica completa (mínimo 2 parágrafos).",
  "coordinates": {
    "lat": número decimal (ex: 31.7683),
    "lng": número decimal (ex: 35.2137)
  },
  "physical_geography": {
    "relief": "Descrição do relevo e topografia",
    "climate": "Descrição do clima histórico",
    "waters": "Fontes de água, rios ou mares próximos"
  },
  "strategic_importance": "Análise da importância política, militar ou comercial na Antiguidade.",
  "events": [
    {
      "event": "Título do Evento Bíblico",
      "reference": "Referência Bíblica (ex: Gênesis 12:1)",
      "description": "Breve relato do que ocorreu"
    }
  ],
  "theological_insight": "Uma lição espiritual ou reflexão teológica baseada neste lugar.",
  "image_search_term": "Termo em inglês para busca de imagens históricas (ex: 'Ancient Jerusalem Temple Mount')"
}

Regras:
1. Use Português do Brasil.
2. Certifique-se de que 'lat' e 'lng' sejam NÚMEROS decimais válidos para o Google Maps.
3. Se o lugar for uma região vasta, use coordenadas centrais.
4. Retorne APENAS o JSON, sem textos explicativos fora dele.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Gere o atlas bíblico para: ${location}` }
      ],
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0].message.content || "{}";
    
    try {
      const atlasData = JSON.parse(text);
      
      // Validação básica dos campos obrigatórios para evitar quebra no frontend
      if (!atlasData.name || !atlasData.coordinates || typeof atlasData.coordinates.lat !== 'number') {
        throw new Error("Resposta da IA incompleta ou em formato inválido.");
      }

      return NextResponse.json(atlasData);
    } catch (parseError) {
      console.error("Erro ao processar JSON da IA:", text);
      return NextResponse.json(
        { error: "A IA retornou um formato inválido. Por favor, tente a pesquisa novamente." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Erro detalhado na API de atlas:", error);
    
    // Tratamento específico para erros de cota ou chave da OpenAI
    if (error.status === 401 || error.status === 403) {
      return NextResponse.json(
        { error: "Chave da API inválida ou sem permissão. Verifique suas configurações." },
        { status: 500 }
      );
    }
    
    if (error.status === 429) {
      return NextResponse.json(
        { error: "Limite de uso da API atingido. Aguarde um momento e tente novamente." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Ocorreu um erro ao processar os dados geográficos. Tente novamente." },
      { status: 500 }
    );
  }
}