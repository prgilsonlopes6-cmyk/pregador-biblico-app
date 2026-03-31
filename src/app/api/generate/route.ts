import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Tópico não fornecido." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Você é um pastor e erudito experiente na tradição da Assembleia de Deus.
Gere um esboço de sermão estruturado e ungido sobre o seguinte tema ou texto bíblico: "${topic}".

[A mensagem DEVE conter obrigatoriamente essa estrutura:]
# Título Sugerido do Sermão
- **Texto Base:** (Referência Bíblica)
- **Introdução:** (Breve contextualização histórica e captação da atenção)
- **Tópico 1:** (Com subtópicos, aplicações e referências de cruzamento bíblico)
- **Tópico 2:** (Com subtópicos, aplicações e referências de cruzamento bíblico)
- **Tópico 3:** (Com subtópicos, aplicações e referências de cruzamento bíblico)
- **Conclusão:** (Fechamento prático e revisão do tema)
- **Apelo:** (Chamada à Salvação, batismo no Espírito Santo ou consagração)

A mensagem deve ser cristocêntrica, fervorosa e doutrinariamente sólida (pentecostal clássica).`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Erro na API de geração de sermão:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao gerar o sermão. Tente novamente." },
      { status: 500 }
    );
  }
}
