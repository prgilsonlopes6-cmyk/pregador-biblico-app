import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function testGemini() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Diga 'oi'");
    console.log("Gemini API OK:", result.response.text());
  } catch (err) {
    console.error("Gemini ERRO:", err.message);
  }
}

async function testBiblia() {
  try {
    const res = await fetch("https://bible-api.com/João 3:16");
    const text = await res.text();
    console.log("Biblia API 'João 3:16':", text);
  } catch (err) {
    console.error("Biblia API ERRO:", err);
  }
  try {
    const res = await fetch("https://bible-api.com/John 3:16?translation=almeida");
    const text = await res.text();
    console.log("Biblia API 'John 3:16?translation=almeida':", text);
  } catch (err) {
    console.error("Biblia API Almeida ERRO:", err);
  }
}

testGemini();
testBiblia();
