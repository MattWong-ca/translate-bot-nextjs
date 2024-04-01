import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { number } = req.body;
    const parsedNumber = parseInt(number, 10);

    if (isNaN(parsedNumber)) {
        return res.status(400).json({ error: 'Invalid number' });
    }
    // SEND TO DATABASE AND CHECK IF THE NUMBER RECEIVED (USER ID) HAS A COUNT LESS THAN 10
    // CHECK USER -- ARE THEY IN DB?
    // IF YES, UPDATE COUNT BY ONE
    // IF NO, ADD USER WITH COUNT = 1
    const result = parsedNumber * 2;
    return res.status(200).json({ result });
}