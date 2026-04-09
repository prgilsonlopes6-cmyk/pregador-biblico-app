import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json({ error: "Referência bíblica não fornecida." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Chave da API não configurada no servidor." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `Você é um exímio erudito em línguas originais da Bíblia (Grego Coiné e Hebraico Bíblico), atuando como professor de hermenêutica e exegese.
O usuário solicitou o seguinte versículo/texto: "${reference}".

Seu objetivo é fornecer este versículo na língua original em formato de "Bíblia Interlinear", seguindo ESTRITAMENTE a estrutura abaixo (use formatação Markdown):

1. **Tradução Literal do Versículo**: Uma tradução direta e compreensível do versículo inteiro.
2. **Análise Interlinear**:
   Liste de forma sequencial (palavra por palavra) conforme aparecem no original. Para cada palavra, use o formato de bullet point:
   - **[Palavra no Idioma Original]** (*Transliteração*) - Tradução simples/Etimologia. (Strong: [Número Strong])
3. **Breve Contexto**: 1 ou 2 frases curtas sobre algum destaque gramatical especial neste versículo, se houver.

IMPORTANTE: 
- Retorne APENAS o texto bíblico com sua análise interlinear, sem introduções longas.
- Caso a referência solicitada seja inválida ou muito longa (ex: capítulos inteiros), resuma gentilmente, focando apenas no primeiro versículo daquela passagem.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message.content || "";

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Erro na API de biblia original:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao processar a pesquisa original. Tente novamente." },
      { status: 500 }
    );
  }
}
