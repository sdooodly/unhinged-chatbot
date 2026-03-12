import dotenv from 'dotenv';

dotenv.config();

export const config = {
  discord: {
    token: process.env.DISCORD_TOKEN || '',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  ollama: {
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  },
} as const;

export function validateConfig(): void {
  if (!config.discord.token) {
    throw new Error('DISCORD_TOKEN is required in .env file');
  }
  if (!config.openai.apiKey) {
    console.warn('⚠️  OPENAI_API_KEY not set. Using local embeddings (slower)');
  }
}
