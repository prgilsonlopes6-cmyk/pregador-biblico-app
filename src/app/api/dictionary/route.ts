import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';
import { getFromCache, setInCache } from '@/lib/cache';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Termo de busca é obrigatório' }, { status: 400 });
  }

  // Tentar cache primeiro
  const cacheKey = `dict:${query}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) return NextResponse.json(cachedData);

  try {
    // 1. Tentar IA (Internet Intelligence) primeiro, conforme solicitado
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const prompt = `
      SISTEMA DE PESQUISA EM TEMPO REAL ATIVADO.
      
      Tarefa: Pesquise na internet e em bases de dados teológicas atualizadas o termo: "${query}".
      
      Diretrizes de Especialista (Assembleia de Deus / CPAD):
      1. REAL-TIME SEARCH: Busque as definições mais recentes, nuances etimológicas (Hebraico/Grego) e discussões acadêmicas atuais.
      2. PERSPECTIVA: Mantenha estritamente a cosmovisão Pentecostal Clássica.
      3. CONTEÚDO: Traga o significado original, transliteração exata e uma aplicação prática ou teológica profunda.
      4. QUALIDADE: A resposta deve ser digna de um dicionário bíblico de referência (ex: Wycliffe ou Champlin), mas com o frescor da pesquisa ao vivo.
      
      Retorne APENAS um objeto JSON dentro de um array no formato abaixo:
      [{ 
        "id": "internet_search", 
        "original_word": "Palavra Original", 
        "transliteration": "Transliteração", 
        "strong_code": "Código Strong (se houver)",
        "definition": "Definição extremamente detalhada, rica e fundamentada vinda da sua pesquisa em tempo real." 
      }]
    `;

    try {
      const aiResult = await model.generateContent(prompt);
      const aiText = aiResult.response.text();
      const jsonMatch = aiText.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        setInCache(cacheKey, data);
        return NextResponse.json(data);
      }
    } catch (aiError: any) {
      console.error('AI Search Error (attempting local fallback):', aiError);
      // Se for 429, não tentamos o fallback local imediatamente se quisermos "internet", 
      // mas como o usuário quer que funcione, o banco local serve de backup.
    }

    // 2. Fallback para Banco Local apenas se a IA falhar ou estiver em cota
    const db = await openDb();
    const results = await db.all(`
      SELECT * FROM dictionary 
      WHERE original_word LIKE ? 
      OR transliteration LIKE ? 
      OR strong_code LIKE ?
      OR definition LIKE ?
      LIMIT 10
    `, [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]);

    if (results.length > 0) {
      return NextResponse.json(results);
    }

    return NextResponse.json({ 
      error: 'A busca via internet está temporariamente indisponível (limite de cota). Tente novamente em alguns segundos.' 
    }, { status: 429 });

  } catch (error: any) {
    console.error('Dictionary API Error:', error);
    return NextResponse.json({ error: 'Erro ao consultar o dicionário' }, { status: 500 });
  }
}
