import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const models = [
  "gemini-1.5-flash",
  "gemini-flash-latest",
  "gemini-1.5-flash-latest",
  "gemini-pro",
  "gemini-1.5-pro"
];

async function testAll() {
  for (const m of models) {
    try {
      const model = genAI.getGenerativeModel({ model: m });
      const res = await model.generateContent("Oi");
      console.log(`[OK] ${m}: ${res.response.text()}`);
    } catch (err) {
      console.error(`[FAIL] ${m}: ${err.message}`);
    }
  }
}

testAll();
