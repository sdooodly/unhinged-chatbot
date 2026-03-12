import dotenv from 'dotenv';

dotenv.config();

export const config = {
  discord: {
    token: process.env.DISCORD_TOKEN || '',
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
  },
} as const;

export function validateConfig(): void {
  if (!config.discord.token) {
    throw new Error('DISCORD_TOKEN is required in .env file');
  }
  if (!config.gemini.apiKey) {
    throw new Error('GEMINI_API_KEY is required in .env file');
  }
}
