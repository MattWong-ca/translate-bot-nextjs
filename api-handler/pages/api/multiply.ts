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

    const result = parsedNumber * 2;
    return res.status(200).json({ result });
}