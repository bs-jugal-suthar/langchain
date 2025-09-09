import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import z from "zod";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-001",
  apiKey: process.env.GOOGLE_API_KEY,
});

const jobDescription = z.object({
  jobTitle: z.string().describe("The title of the job"),
  jobDescription: z.string().describe("The description of the job"),
  jobRequirements: z.string().describe("The requirements of the job"),
  jobResponsibilities: z.string().describe("The responsibilities of the job"),
  jobBenefits: z.string().describe("The benefits of the job"),
  jobLocation: z.string().describe("The location of the job"),
  experienceLevel: z
    .enum(["Entry", "Mid", "Senior"])
    .describe("The experience level of the job"),
  yearOfExperience: z.number().describe("The year of experience of the job"),
});

const reactJob = `Job Code: BS-123  
Experience: 1–3 Years  
Vacancies: 1  

Responsibilities:  
- Develop and implement new software programs along with other team members.  
- Maintain and improve the performance of existing software.  
- Clearly and regularly communicate with management and technical support colleagues.  
- Actively participate in software design.  
- Test and maintain software products to ensure strong functionality and optimization.  

Qualifications & Skills (Mandatory):  
- 1+ years of experience in web and software development.  
- Proficient understanding of web markup, including HTML5 and CSS3.  
- Hands-on experience with Bootstrap or similar UI frameworks.  
- Hands-on experience in React.js.  
- Understanding of software development lifecycle.  

office location is Ahmedabad and Mumbai
`;

const main = async () => {
  const prompt = ChatPromptTemplate.fromMessages([
    {
      role: "system",
      content:
        "You are a helpful assistant that can extract the job description from a job posting",
    },
    {
      role: "user",
      content: "${jobDescription}",
    },
  ]);
  const strcuturedLLM = model.withStructuredOutput(jobDescription as any);

  const chain=prompt.pipe(strcuturedLLM);

  const response = await chain.invoke({
    jobDescription: reactJob,
  });

  console.log(response);
};

main();
