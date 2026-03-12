import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config';
import { SYSTEM_PROMPT } from './persona';

let genAI: GoogleGenerativeAI;
let model: ReturnType<GoogleGenerativeAI['getGenerativeModel']>;

function initializeGemini(): void {
  genAI = new GoogleGenerativeAI(config.gemini.apiKey);
  model = genAI.getGenerativeModel({ 
    model: config.gemini.model,
    systemInstruction: SYSTEM_PROMPT,
  });
}

export async function getUnhingedResponse(userMessage: string): Promise<string> {
  if (!model) {
    initializeGemini();
  }

  try {
    const result = await model.generateContent(userMessage);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Empty response from Gemini API');
    }

    return text.trim();
  } catch (error: unknown) {
    console.error('Error calling Gemini API:', error);

    if (error instanceof Error) {
      if (error.message.includes('timeout') || error.message.includes('ECONNABORTED')) {
        return "Listen up, maggot. My connection to the pain center timed out. But here's free advice: stop making excuses and GO LIFT SOMETHING.";
      }
      if (error.message.includes('quota') || error.message.includes('rate limit')) {
        return "The drill sergeant's quota is maxed out from yelling at other weaklings. But you know what ISN'T maxed? Your potential to do burpees RIGHT NOW.";
      }
    }

    return "System malfunction detected. Unlike your workout routine, which is non-existent. Drop and give me 50.";
  }
}
