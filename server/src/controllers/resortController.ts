// ====== Resort Controller: Fetch ski resort info from Ski API securely ======
import { Request, Response } from 'express';
import axios from 'axios';

// ====== GET /resort?name=ResortName ======
export const getResortInfo = async (
  req: Request<unknown, unknown, unknown, { name?: string }>,
  res: Response
): Promise<void> => {
  const resortName = req.query.name;

  if (!resortName) {
    res.status(400).json({ error: 'Resort name is required.' });
    return;
  }

  try {
    const response = await axios.get('https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort', {
      params: { name: resortName },
      headers: {
        'X-RapidAPI-Key': process.env.SKI_API_KEY || '',
        'X-RapidAPI-Host': 'ski-resorts-and-conditions.p.rapidapi.com',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.warn('⚠️ Ski API failed. Using mock resort data.');
    res.json({
      data: [
        {
          name: 'Mock Vail',
          region: 'CO',
          country: 'US',
          slug: 'mock-vail',
          location: {
            latitude: 39.642464,
            longitude: -105.871872,
          },
        },
      ],
    });
  }
};

// ====== GET /resort/details?slug=slug-name ======
export const getResortDetails = async (
  req: Request<unknown, unknown, unknown, { slug?: string }>,
  res: Response
): Promise<void> => {
  const slug = req.query.slug;

  if (!slug) {
    res.status(400).json({ error: 'Resort slug is required.' });
    return;
  }

  try {
    const response = await axios.get(`https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort/${slug}/conditions`, {
      headers: {
        'X-RapidAPI-Key': process.env.SKI_API_KEY || '',
        'X-RapidAPI-Host': 'ski-resorts-and-conditions.p.rapidapi.com',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Ski API slug-fetch error:', (error as Error).message);
    res.status(500).json({ error: 'Failed to fetch resort conditions.' });
  }
};
