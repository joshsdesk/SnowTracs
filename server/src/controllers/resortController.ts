// ====== Resort Controller: Fetch ski resort info from Ski API securely ======
import { Request, Response } from 'express';
import axios from 'axios';

export const getResortInfo = async (req: Request, res: Response) => {
  const resortName = req.query.name as string;

  if (!resortName) {
    return res.status(400).json({ error: 'Resort name is required.' });
  }

  try {
    const response = await axios.get('https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort', {
      params: { resort: resortName },
      headers: {
        'X-RapidAPI-Key': process.env.SKI_API_KEY as string,
        'X-RapidAPI-Host': 'ski-resorts-and-conditions.p.rapidapi.com',
      },
    });

    res.json(response.data);
  } catch (error: any) {
    console.error('Ski API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch resort data.' });
  }
};
