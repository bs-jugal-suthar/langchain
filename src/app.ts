import express from 'express';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = 3000;

const model = new ChatGoogleGenerativeAI({
  model: 'gemini-2.0-flash',
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.0,
});

const  testFunction=async(question:string)=>{
   try {
    console.log("Starting the function");
    const response=await model.invoke(question);
    console.log(response);
   } catch (error) {
    console.log(error);
   }
}

testFunction("Hello Gemini! Can you introduce yourself in one sentence?");


// app.get('/', async (req, res) => {
//   const response = await model.invoke('Hello, how are you?');
//   res.send(response.content);
// });

// app.listen(port, () => {
//   return console.log(`Express is listening at http://localhost:${port}`);
// });
