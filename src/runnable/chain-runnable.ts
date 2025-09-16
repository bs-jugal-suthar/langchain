import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser ,JsonOutputParser} from "@langchain/core/output_parsers";
import dotenv from "dotenv"

dotenv.config()

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-001",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0
});

const prompt=ChatPromptTemplate.fromTemplate("tell me about this technology stack: {technologyStack}")


const main=async()=>{
   const chain=prompt.pipe(model).pipe(new JsonOutputParser())
   const result=await chain.invoke({technologyStack:"reactjs"})
   console.log(result)
}

main()

