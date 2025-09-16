
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



const main=async()=>{
    const result=await model.invoke("what is the capital of india?")
    console.log("result before  ",result)
    const parser=new StringOutputParser()
    const result2= await parser.invoke(result)
    console.log("result2 after ",result2)
}

main()
