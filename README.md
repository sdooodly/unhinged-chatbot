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

### 2. Configure Environment

Edit `.env`:
```
DISCORD_TOKEN=your_discord_bot_token
OPENAI_API_KEY=your_openai_api_key
```

### 3. Create Knowledge Base

```bash
npm run setup
```

This will:
- Load `knowledge/gym-knowledge.txt`
- Create embeddings
- Build vector store in `./vectorstore`

### 4. Run Bot

```bash
npm run dev
```

## How It Works

1. **Knowledge Base**: All responses come from `knowledge/gym-knowledge.txt`
2. **Embeddings**: Text is converted to vectors using OpenAI embeddings
3. **Vector Store**: FAISS stores vectors for fast similarity search
4. **RAG**: When user sends message:
   - Find relevant knowledge chunks
   - Pass to LLM with context
   - Generate response

## Customization

Edit `knowledge/gym-knowledge.txt` to:
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
