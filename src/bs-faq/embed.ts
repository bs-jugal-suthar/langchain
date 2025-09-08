import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from "dotenv";
import { faqs } from "./data";
dotenv.config();

const embeddings = new GoogleGenerativeAIEmbeddings();

embeddings.apiKey = process.env.GOOGLE_API_KEY;

const store = new MemoryVectorStore(embeddings);

const createEmbeding = async () => {
  await store.addDocuments(
    faqs.map((faq) => {
      return {
        pageContent: `FAQ : Question : ${faq.question} \n Answer : ${faq.answer}`,
        metadata: {
          question: faq.question,
          answer: faq.answer,
        },
      };
    })
  );

 const result= await store.similaritySearch(`maintainance and support`,1)
 console.log("result is ",result)
};

createEmbeding()