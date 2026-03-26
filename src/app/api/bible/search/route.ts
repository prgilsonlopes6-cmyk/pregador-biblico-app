import { NextResponse } from 'next/server';
import { getFromCache, setInCache } from '@/lib/cache';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  // Tentar cache primeiro
  const cacheKey = `bible:${query}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) return NextResponse.json(cachedData);

  try {
    // Tentar buscar na bible-api.com (Versão Almeida)
    const bibleApiResponse = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=almeida`);
    
    if (bibleApiResponse.ok) {
      const data = await bibleApiResponse.json();
      setInCache(cacheKey, data);
      return NextResponse.json(data);
    }

    // Fallback para IA se não for uma referência clara ou não encontrada
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const prompt = `
      Atue como um teólogo das Assembleias de Deus conectado ao conhecimento atualizado da internet. 
      O usuário busca por: "${query}". 
      
      Se for um tema bíblico, sugira o versículo mais relevante sob a ótica Pentecostal Clássica, fornecendo um breve comentário profundo sobre o porquê dele ser central.
      Se for uma referência direta (ex: "João 3:16"), forneça o texto de confiança (Almeida) e uma nota sobre sua importância.
      
      Retorne apenas um objeto JSON com: 
      { "reference": "Livro Cap:Vers", "text": "Texto do versículo acompanhado de breve nota teológica profunda.", "is_ai_suggestion": true }
    `;

    const aiResult = await model.generateContent(prompt);
    const aiText = aiResult.response.text();
    
    // Extrair JSON da resposta da IA - usando [\s\S] em vez de flag 's' para compatibilidade
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);
      setInCache(cacheKey, data);
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Não encontrei o que você buscava.' }, { status: 404 });
  } catch (error: any) {
    console.error('Bible Search Error:', error);
    
    if (error.status === 429) {
      return NextResponse.json({ 
        error: 'A busca inteligente está muito ocupada agora. Por favor, aguarde alguns segundos e tente novamente.', 
        details: 'Limite de cota atingido (429).'
      }, { status: 429 });
    }

    return NextResponse.json({ error: 'Erro ao processar busca' }, { status: 500 });
  }
}
