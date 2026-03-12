import { Client, GatewayIntentBits, Message } from 'discord.js';
import { config, validateConfig } from './config';
import { getUnhingedResponse } from './gemini';

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

client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user?.tag}`);
  console.log('💪 Ready to roast some lazy people!');
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

    // Get response from Gemini
    const response = await getUnhingedResponse(message.content);

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
    console.log('Token length:', config.discord.token.length);
    console.log('Token starts with:', config.discord.token.substring(0, 20) + '...');
    
    await client.login(config.discord.token);
  } catch (error: any) {
    console.error('Failed to start bot:', error.message);
    
    if (error.message.includes('Incorrect login') || error.message.includes('token')) {
      console.error('\n❌ Invalid Discord token!');
      console.error('Please:');
      console.error('1. Go to https://discord.com/developers/applications');
      console.error('2. Select your application');
      console.error('3. Go to Bot tab');
      console.error('4. Click "Reset Token"');
      console.error('5. Copy the NEW token');
      console.error('6. Update DISCORD_TOKEN in .env file');
    }
    
    process.exit(1);
  }
}

start();
