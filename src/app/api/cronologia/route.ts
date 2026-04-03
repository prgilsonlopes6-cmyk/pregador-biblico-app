import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { era } = await req.json();

    if (!era) {
      return NextResponse.json({ error: "Era não fornecida." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Chave da API não configurada no servidor." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `Você é um historiador e erudito bíblico. Sua tarefa é fornecer uma lista cronológica de eventos principais para a era bíblica: "${era}".

Responda ESTRITAMENTE em formato JSON com a seguinte estrutura:
{
  "era": "Nome da Era",
  "summary": "Breve resumo teológico e histórico desta era",
  "events": [
    {
      "date": "Ano aproximado (ex: 1446 a.C. ou 30 d.C.)",
      "title": "Título do Evento",
      "description": "Explicação breve do que ocorreu",
      "characters": ["Personagem 1", "Personagem 2"],
      "significance": "Importância teológica para a redenção"
    }
  ]
}

Forneça entre 5 e 8 eventos principais, em ordem cronológica correta.
A resposta deve ser APENAS o JSON, sem markdown ou explicações externas.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    let text = completion.choices[0].message.content || "";

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro na API de Cronologia:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao buscar a cronologia. Tose novamente." },
      { status: 500 }
    );
  }
}
