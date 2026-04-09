import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { query, category } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const systemPrompt = `Você é um historiador bíblico especialista e teólogo.
Sua tarefa é gerar uma linha do tempo estruturada em JSON sobre um termo fornecido.
A categoria da busca é: ${category}.

O JSON deve seguir EXATAMENTE esta estrutura:
{
  "title": "Título da Linha do Tempo",
  "summary": "Um resumo histórico e teológico (máximo 300 caracteres). Se for um personagem, inclua nascimento/morte aproximados aqui.",
  "events": [
    {
      "date": "Data ou Período (ex: 1446 a.C., Cerca de 30 d.C.)",
      "title": "Título do Evento",
      "description": "Descrição detalhada do evento e seu impacto.",
      "verses": "Referência bíblica principal (ex: Gênesis 12:1-3)"
    }
  ]
}

Regras:
1. Respostas estritamente em Português do Brasil.
2. Seja preciso cronologicamente usando a cronologia bíblica tradicional.
3. Se for CATEGORIA PERSONAGEM: Foque na vida e eventos principais da pessoa.
4. Se for CATEGORIA TEMA: Mostre como esse tema se desenvolveu em eventos bíblicos (do AT ao NT).
5. Se for CATEGORIA PERÍODO: Foque nos marcos temporais daquela era específica.
6. Retorne APENAS o JSON.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Gere uma linha do tempo para: ${query}` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();

    if (data.error) {
       console.error("OpenAI Error:", data.error);
       return NextResponse.json({ error: "Erro na API de IA" }, { status: 500 });
    }

    const timelineData = JSON.parse(data.choices[0].message.content);
    return NextResponse.json(timelineData);

  } catch (error) {
    console.error("Error generating timeline:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
