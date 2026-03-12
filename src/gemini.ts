import { GoogleGenerativeAI } from "@google/generative-ai";
import { GYM_PROMPT } from "./persona";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });

export async function getGeminiResponse(userInput: string) {
    const result = await model.generateContent(`${GYM_PROMPT}\n\nUser says: ${userInput}`);
    return result.response.text();
}