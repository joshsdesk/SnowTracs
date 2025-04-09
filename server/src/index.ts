// server/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import mapRoutes from './routes/map'; // 👈 this line is new

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/map', mapRoutes); // 👈 register /map route

// Test route
app.get('/', (_req, res) => {
  res.send('SnowTracs backend is live');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
