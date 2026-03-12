import { Client, GatewayIntentBits, Message } from 'discord.js';
import { config, validateConfig } from './config';
import { initializeRAG, getResponse } from './rag-engine';
import * as fs from 'fs';

// Disable SSL verification (only for development/corporate networks)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once('ready', async () => {
  console.log(`✅ Bot is online as ${client.user?.tag}`);
  
  // Check if vector store exists
  if (!fs.existsSync('./vectorstore')) {
    console.error('❌ Vector store not found!');
    console.error('Please run: npm run setup');
    process.exit(1);
  }

  // Initialize RAG
  try {
    await initializeRAG();
    console.log('💬 Ready to chat!');
  } catch (error) {
    console.error('Failed to initialize RAG:', error);
    process.exit(1);
  }
});

client.on('messageCreate', async (message: Message) => {
  // Ignore bot's own messages
  if (message.author.bot) return;

  // Ignore empty messages
  if (!message.content.trim()) return;

  try {
    // Show typing indicator (if supported)
    if ('sendTyping' in message.channel) {
      await message.channel.sendTyping();
    }

    console.log(`📩 Message from ${message.author.tag}: ${message.content}`);

    // Get response from RAG
    const response = await getResponse(message.content);

    // Send response
    await message.reply(response);

    console.log(`✅ Replied to ${message.author.tag}`);
  } catch (error) {
    console.error('Error handling message:', error);
    await message.reply('Something broke. Unlike your workout streak, which never existed.');
  }
});

// Start the bot
async function start() {
  try {
    validateConfig();
    
    console.log('🔄 Connecting to Discord...');
    
    await client.login(config.discord.token);
  } catch (error: any) {
    console.error('Failed to start bot:', error.message);
    process.exit(1);
  }
}

start();
