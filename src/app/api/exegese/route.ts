import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { word } = await req.json();

    if (!word) {
      return NextResponse.json({ error: "Texto não fornecido." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Chave da API não configurada no servidor." }, { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(apiKey as string);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Você é um exegeta magistral especializado nas línguas originais da Bíblia (Grego Coiné e Hebraico Bíblico), e ensina pastores da Assembleia de Deus.
Realize uma exegese profunda da seguinte palavra ou versículo: "${word}".
[IMPORTANTE: Se a palavra acima estiver em português, identifique o termo bíblico original correspondente, e faça a exegese focada na PALAVRA ORIGINAL.]

[Sua resposta OBRIGATORIAMENTE deve conter e usar formatação Markdown clara:]
1. **Apresentação da Palavra/Versículo:** Qual o termo original no Grego ou Hebraico (alfabeto original e sua TRANSLITERAÇÃO exata, pois a busca pode ter sido em português).
2. **Dicionário Strong:** O número de Strong e a etimologia.
3. **Morfologia & Gramática:** Análise do tempo verbal ou da estrutura lógica no original (se for um versículo).
4. **Contexto Original:** O que o texto significava para os ouvintes originais naquela cultura da época.
5. **Aplicação Homilética:** Um "ouro" teológico ou revelação que o pregador pode usar para a igreja hoje.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Erro na API de exegese:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao processar a exegese original. Tente novamente." },
      { status: 500 }
    );
  }
}
