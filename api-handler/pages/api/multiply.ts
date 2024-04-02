import { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { question } = req.body;
    // const parsedNumber = parseInt(number, 10);

    // if (isNaN(parsedNumber)) {
    //     return res.status(400).json({ error: 'Invalid number' });
    // }
    const answer = await main(question)
    // SEND TO DATABASE AND CHECK IF THE NUMBER RECEIVED (USER ID) HAS A COUNT LESS THAN 10
    // CHECK USER -- ARE THEY IN DB?
    // IF YES, UPDATE COUNT BY ONE
    // IF NO, ADD USER WITH COUNT = 1
    // const result = parsedNumber * 2;
    console.log(answer)
    return res.status(200).json({ answer });
}

async function main(prompt: string) {
    console.log("Prompt:", prompt);
  
    try {
      // Construct the request payload
      const payload = {
        question: prompt,
        chat_history: [],
        knowledge_source_id: "cluhjs7k1001mwu2coixx6v0e", // replace with your model id
      };
  
      // Set the headers
      const headers = {
        "x-api-key": process.env.FLOCK_BOT_API_KEY, // Ensure API key is set in .env
      };
  
      // Send POST request using axios
      const response = await axios.post(
        `${process.env.FLOCK_BOT_ENDPOINT}/chat/conversational_rag_chat`,
        payload,
        {
          headers,
        }
      );
  
      // Output the response data
    //   console.log(response.data);
      return response.data.answer;
    } catch (error) {
      console.error("Error:", error);
    }
  }