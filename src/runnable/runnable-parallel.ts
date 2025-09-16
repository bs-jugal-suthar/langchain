import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableParallel, RunnableSequence } from "@langchain/core/runnables";
import geminiModel from "../model/gemin-model";
import { StringOutputParser } from "@langchain/core/output_parsers";


const main=async()=>{
    const jokePrompt = ChatPromptTemplate.fromTemplate("tell me a joke about {topic}");
    const techPrompt= ChatPromptTemplate.fromTemplate("tell me about this technology {tech} in 50 words")

    const sequence1=RunnableSequence.from([
        jokePrompt,
         geminiModel,
         new StringOutputParser()
    ])

    const sequence2=RunnableSequence.from([
        techPrompt,
        geminiModel,
        new StringOutputParser()
    ])

    const parallel=RunnableParallel.from({
        joke:sequence1,
        tech:sequence2
    })

    const result=await parallel.invoke({topic:"circus",tech:"langchain"})
    console.log("result ",result)
}

main()