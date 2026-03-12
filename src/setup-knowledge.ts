// Disable SSL verification for corporate networks
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { OpenAIEmbeddings } from '@langchain/openai';
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { config } from './config';
import * as fs from 'fs';
import * as path from 'path';

async function setupKnowledgeBase() {
  console.log('🔧 Setting up knowledge base...');

  // Load knowledge documents
  const loader = new TextLoader('knowledge/basic-knowledge.txt');
  const docs = await loader.load();

  console.log(`📄 Loaded ${docs.length} documents`);

  // Split into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const splitDocs = await textSplitter.splitDocuments(docs);
  console.log(`✂️  Split into ${splitDocs.length} chunks`);

  // Create embeddings
  console.log('🧠 Creating embeddings (this may take a minute)...');
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: config.openai.apiKey,
  });

  // Create vector store
  console.log('💾 Creating vector store...');
  const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);

  // Save to disk
  const directory = './vectorstore';
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  await vectorStore.save(directory);
  console.log('✅ Knowledge base created and saved!');
  console.log(`📁 Saved to: ${path.resolve(directory)}`);
  console.log('\nYou can now run: npm run dev');
}

setupKnowledgeBase().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
