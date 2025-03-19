import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
