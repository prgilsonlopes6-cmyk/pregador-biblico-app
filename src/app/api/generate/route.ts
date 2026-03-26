import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: 'O tema ou texto bíblico é obrigatório.' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "SUA_CHAVE_AQUI") {
      return NextResponse.json({ error: 'API Key não configurada. Defina GEMINI_API_KEY no arquivo .env.local na raiz do projeto.' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Aja como um teólogo experiente e um pregador inspirador (estilo "Sermão na Mão"). 
    Quero que você crie um sermão estruturado, profundo e pronto para pregar sobre o seguinte tema/texto: "${topic}".
    
    A estrutura deve conter obrigatoriamente:
    1. Título Cativante.
    2. Introdução (Contextualização histórica da passagem).
    3. Exegese e Idiomas Originais (Análise profunda de pelo menos 2 palavras-chave no Hebraico ou Grego original, citando a raiz primária e o significado).
    4. Desenvolvimento Prático (3 pontos principais do texto).
    5. Conclusão Marcante.
    
    Formate tudo com Markdown (negritos, listas) para que o usuário possa copiar e organizar.
    Responda em Português do Brasil.`;

    const result = await model.generateContent(prompt);
    const generatedText = result.response.text() || "Não foi possível gerar o sermão no momento.";

    return NextResponse.json({ text: generatedText });
  } catch (error: any) {
    console.error('Erro na IA:', error);
    
    if (error.status === 429) {
      return NextResponse.json({ error: 'A IA está muito ocupada agora (limite de cota). Aguarde alguns segundos e tente novamente.' }, { status: 429 });
    }
    
    return NextResponse.json({ error: 'Erro de conexão com o gerador IA.' }, { status: 500 });
  }
}
