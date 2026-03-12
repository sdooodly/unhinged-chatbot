import { OpenAIEmbeddings } from '@langchain/openai';
import { ChatOpenAI } from '@langchain/openai';
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import { RetrievalQAChain } from 'langchain/chains';
import { PromptTemplate } from '@langchain/core/prompts';
import { config } from './config';

let chain: RetrievalQAChain | null = null;

export async function initializeRAG() {
  console.log('🔧 Initializing RAG engine...');

  // Load embeddings
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: config.openai.apiKey,
  });

  // Load vector store
  const vectorStore = await FaissStore.load('./vectorstore', embeddings);
  console.log('✅ Vector store loaded');

  // Create retriever
  const retriever = vectorStore.asRetriever({
    k: 3, // Return top 3 relevant chunks
  });

  // Create LLM
  const llm = new ChatOpenAI({
    openAIApiKey: config.openai.apiKey,
    modelName: 'gpt-3.5-turbo',
    temperature: 0.9, // High temperature for creative/aggressive responses
  });

  // Create custom prompt
  const prompt = PromptTemplate.fromTemplate(`
Use the following context to respond to the user's message. Maintain the personality and tone defined in the context.

Context: {context}

User message: {question}

Response:`);

  // Create chain
  chain = RetrievalQAChain.fromLLM(llm, retriever, {
    prompt,
    returnSourceDocuments: false,
  });

  console.log('✅ RAG engine ready');
}

export async function getResponse(userMessage: string): Promise<string> {
  if (!chain) {
    throw new Error('RAG engine not initialized. Run npm run setup first.');
  }

  try {
    const result = await chain.call({
      query: userMessage,
    });

    return result.text.trim();
  } catch (error) {
    console.error('Error getting response:', error);
    return "System malfunction. Unlike your workout routine, which is non-existent. Drop and give me 50.";
  }
}
