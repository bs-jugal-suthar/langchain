
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv"
import { RunnableLambda } from "@langchain/core/runnables";

dotenv.config()

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-001",    
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0
});


export default geminiModel;