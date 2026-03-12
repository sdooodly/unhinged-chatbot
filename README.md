# Unhinged Chatbot with RAG

Discord bot with RAG-based (Retrieval Augmented Generation) responses using LangChain and vector embeddings.

## Features

- 🧠 RAG-based responses using your own knowledge base
- 📚 Vector embeddings for semantic search
- 🎯 LangChain for orchestration
- 🔒 Full control over responses (no random API calls)

## Setup

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

Note: Use `--legacy-peer-deps` flag due to peer dependency conflicts in LangChain packages.

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
DISCORD_TOKEN=your_discord_bot_token_here
OPENAI_API_KEY=your_openai_api_key_here
```

Get your Discord token from: https://discord.com/developers/applications
Get your OpenAI API key from: https://platform.openai.com/api-keys

### 3. Create Knowledge Base

**IMPORTANT**: Run this on a non-corporate network (home WiFi or phone hotspot) as corporate firewalls may block OpenAI API.

```bash
npm run setup
```

This will:
- Load `knowledge/basic-knowledge.txt`
- Create embeddings using OpenAI
- Build vector store in `./vectorstore`

If you see SSL certificate errors, the code includes a bypass for corporate networks, but you may still need to use a personal network.

### 4. Run Bot

After the vector store is created, start the bot:

```bash
npm run dev
```

The bot will:
- Connect to Discord
- Load the vector store
- Start responding to messages

### 5. Test the Bot

Send a message in any Discord channel where the bot has access. The bot will reply using knowledge from the RAG system.

## How It Works

1. **Knowledge Base**: All responses come from `knowledge/basic-knowledge.txt`
2. **Embeddings**: Text is converted to vectors using OpenAI embeddings
3. **Vector Store**: FAISS stores vectors for fast similarity search
4. **RAG**: When user sends message:
   - Find relevant knowledge chunks
   - Pass to LLM with context
   - Generate response

## Customization

Edit `knowledge/basic-knowledge.txt` to:
- Add new responses
- Change personality
- Customize advice

Then run `npm run setup` again to rebuild the vector store.

## Architecture

```
User Message
    ↓
Discord Bot
    ↓
RAG Engine
    ↓
Vector Search (find relevant knowledge)
    ↓
LLM (generate response with context)
    ↓
Response to User
```

## Benefits vs Direct API

- ✅ Full control over responses
- ✅ Consistent personality
- ✅ No random hallucinations
- ✅ Customizable knowledge base
- ✅ Faster responses (cached embeddings)
- ✅ Cost effective (only embeddings + small LLM calls)


## Troubleshooting

### SSL Certificate Errors

If you see `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` errors:
- You're likely on a corporate network with SSL inspection
- Switch to a personal network (home WiFi or phone hotspot)
- The code includes `NODE_TLS_REJECT_UNAUTHORIZED = '0'` but this may not work on all corporate networks

### Vector Store Not Found

If you see "Vector store not found" error:
- Run `npm run setup` first to create the vector store
- Make sure the setup completed successfully without errors
- Check that `./vectorstore` directory exists

### Discord Connection Issues

If the bot can't connect to Discord:
- Verify your `DISCORD_TOKEN` in `.env` is correct
- Check that the bot has MESSAGE CONTENT INTENT enabled in Discord Developer Portal
- Corporate firewalls may block Discord API - use personal network

### Dependency Installation Issues

If `npm install` fails:
- Always use `npm install --legacy-peer-deps` flag
- Delete `node_modules` and `package-lock.json` and try again
- Make sure you have Node.js v18+ installed

## Next Steps

Once the bot is running:
1. Test it by sending messages in Discord
2. Customize `knowledge/basic-knowledge.txt` to change personality
3. Run `npm run setup` again after editing knowledge base
4. Restart the bot with `npm run dev`
