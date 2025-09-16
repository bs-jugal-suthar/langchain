import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  JsonOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";
import dotenv from "dotenv";
import { RunnableLambda } from "@langchain/core/runnables";

dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-001",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0,
});

const customRunnable = new RunnableLambda({
  func: async (input: any) => {
    return await model.invoke(input);
  },
});

const main = async () => {
  const result = await customRunnable.invoke("how are you  ?");
  console.log(result);
};

main();
