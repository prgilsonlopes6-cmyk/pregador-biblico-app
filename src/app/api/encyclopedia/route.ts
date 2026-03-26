import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { getFromCache, setInCache } from '@/lib/cache';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Termo de busca é obrigatório' }, { status: 400 });
  }

  // Tentar cache primeiro
  const cacheKey = `encyclopedia:${query}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) return NextResponse.json(cachedData);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
      CONFIGURAÇÃO DE PESQUISADOR VIVO (LIVE RESEARCHER) ATIVADA.
      
      Objetivo: Realizar um levantamento PROFUNDO e EXEGÉTICO em tempo real sobre: "${query}".
      
      Protocolo de Pesquisa:
      1. CONSULTA GLOBAL: Acesse dados históricos, arqueológicos e teológicos de ponta na internet.
      2. FILTRO DOUTRINÁRIO: Aplique a lente das Assembleias de Deus (Pentecostalismo Clássico / CPAD).
      3. ESTRUTURA ENCICLOPÉDICA:
         - Contextualização Histórica e Geográfica.
         - Análise de Termos Originais (Hebraico/Grego) com profundidade acadêmica.
         - Impacto Teológico para a Igreja hoje.
         - Curiosidades ou descobertas recentes relacionadas ao tema.
      4. FORMATAÇÃO: Use Markdown rico (títulos, listas, negritos) para um artigo de referência premium.
      
      Sua resposta deve ser um "Artigo Enciclopédico de Referência", exaustivo e inspirador.
      Responda em Português do Brasil.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    setInCache(cacheKey, { content: text });
    return NextResponse.json({ content: text });
  } catch (error: any) {
    console.error('Encyclopedia API Error:', error);
    
    if (error.status === 429) {
      return NextResponse.json({ 
        error: 'A Enciclopédia Inteligente está muito ocupada agora. Por favor, aguarde alguns segundos e tente novamente.', 
        details: 'Limite de cota atingido (429).'
      }, { status: 429 });
    }

    return NextResponse.json({ 
      error: 'Erro ao consultar a Enciclopédia Inteligente', 
      details: error.message || String(error)
    }, { status: 500 });
  }
}
