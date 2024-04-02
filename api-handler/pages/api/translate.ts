import { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const { question } = req.body;
    const answer = await fetchFlockResponse(question)
    return res.status(200).json({ answer });
}

async function fetchFlockResponse(question: string) {
    try {
        const payload = {
            question: question,
            chat_history: [],
            knowledge_source_id: "cluhjs7k1001mwu2coixx6v0e",
        };
        const headers = {
            "x-api-key": process.env.NEXT_PUBLIC_FLOCK_BOT_API_KEY,
        };
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_FLOCK_BOT_ENDPOINT}/chat/conversational_rag_chat`,
            payload,
            {
                headers,
            }
        );
        return response.data.answer;
    } catch (error) {
        console.error("Error:", error);
    }
}