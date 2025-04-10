// ====== Core Imports ======
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// ====== Route Imports ======
import mapRoutes from './routes/map'; // Existing map route
import resortRoutes from './routes/resortRoutes'; // NEW resort info route

// ====== Config ======
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ====== Middleware ======
app.use(cors());
app.use(express.json());

// ====== Routes ======
app.use('/map', mapRoutes);
app.use('/resort', resortRoutes);

// ====== Default Route ======
app.get('/', (_req, res) => {
  res.send('SnowTracs backend is live');
});

// ====== Start Server ======
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
