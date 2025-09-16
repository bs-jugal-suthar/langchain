
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv"
import { RunnableLambda, RunnableSequence } from "@langchain/core/runnables";

dotenv.config()

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-001",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0
});


const main=async()=>{
    const jokePrompt = ChatPromptTemplate.fromTemplate("tell me a joke about {topic}");
    const analysisPrompt = ChatPromptTemplate.fromTemplate("is this a funny joke? {joke}");

    const sequence= RunnableSequence.from([
        jokePrompt,
        model,
        new StringOutputParser(),
        new RunnableLambda({
            func:async(input:string)=>{
                return {joke:input}
            }
        }),
        analysisPrompt,
        model,
        new StringOutputParser()
    ])

    const result=await sequence.invoke({topic:"circus"})
    console.log("result ",result)
}

main()