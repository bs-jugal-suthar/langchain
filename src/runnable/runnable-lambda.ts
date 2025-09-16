
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv"
import { RunnableLambda } from "@langchain/core/runnables";

dotenv.config()

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-001",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0
});




// 1) call composedChain.invoke({ topic: "circus" })
// 2) chain.invoke -> model -> returns "Why did the circus bear cross the road?"
// 3) RunnableLambda returns { joke: "Why did the circus bear..." }
// 4) analysisPrompt receives { joke } -> model -> returns "This is a cute and punny joke!"
// 5) composedChain.invoke resolves to "This is a cute and punny joke!"
// 6) console.log("result", result)  // prints the analysis string only

const main=async()=>{
    const analysisPrompt = ChatPromptTemplate.fromTemplate(
        "is this a funny joke? {joke}"
      );
    const jokePrompt = ChatPromptTemplate.fromTemplate(
        "tell me a joke about {topic}"
      );
    const chain=jokePrompt.pipe(model).pipe(new StringOutputParser())

      const composedChain = new RunnableLambda({
        func: async (input: { topic: string }) => {
          const result = await chain.invoke(input);
          return { joke: result };
        },
      })
        .pipe(analysisPrompt)
        .pipe(model)
        .pipe(new StringOutputParser());
      
     const result= await composedChain.invoke({ topic: "circus" });
     console.log("result ",result)
}

// FLOW: composedChain.invoke({ topic: "circus" })
//  └─> composedChain -> RunnableLambda.invoke()
//        └─> RunnableLambda.func(input)
//              └─> chain.invoke(input)         // INNER INVOKE (joke generation)
//                    ├─> jokePrompt.invoke(...)
//                    ├─> model.invoke(...)     // network call #1
//                    └─> StringOutputParser.invoke(...)  => returns joke (string)
//              ◀─- chain.invoke resolves with joke
//              └─> RunnableLambda.func returns { joke: "<joke string>" }
//        └─> composedChain continues pipeline:
//              ├─> analysisPrompt.invoke({ joke })
//              ├─> model.invoke(...)         // network call #2
//              └─> StringOutputParser.invoke(...) => returns analysis (string)
//  └─> composedChain.invoke resolves => final analysis string


main()


