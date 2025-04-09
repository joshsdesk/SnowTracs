import { Request, Response } from 'express';

export const getMapData = (req: Request<any, any, any, { q?: string }>, res: Response) => {
  const query = req.query.q?.toLowerCase() || '';

  const trails = [
    { id: 1, name: 'Bunny Slope', difficulty: 'Easy' },
    { id: 2, name: 'Powder Run', difficulty: 'Intermediate' },
    { id: 3, name: 'Black Diamond', difficulty: 'Expert' },
    { id: 4, name: 'Summit Peak', difficulty: 'Expert' }
  ];

  const filtered = trails.filter((trail) =>
    trail.name.toLowerCase().includes(query)
  );

  res.json({ trails: filtered });
};
