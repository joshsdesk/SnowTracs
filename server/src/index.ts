// ====== Core Imports ======
import express, { Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import jwt from 'jsonwebtoken';

// ====== Local Imports ======
import db from './config/connection';
import { typeDefs, resolvers } from './schema';
import mapRoutes from './routes/map';
import resortRoutes from './routes/resortRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ====== JWT Secret Key ======
const secret = process.env.JWT_SECRET || 'mysecretkey';

// ====== Decode Token Helper ======
const getUserFromToken = (token: string | null) => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secret);
    return decoded;
  } catch (err) {
    return null;
  }
};

// ====== Apollo Server Setup ======
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  await server.start();

  // ====== Middleware ======
  app.use(cors());
  app.use(express.json());

  // ====== REST Routes ======
  app.use('/map', mapRoutes);
  app.use('/resort', resortRoutes);

  // ====== GraphQL Endpoint ======
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || null;
        const user = getUserFromToken(token);
        return { user };
      },
    })
  );

  // ====== Default Route ======
  app.get('/', (_req, res) => {
    res.send('SnowTracs backend is live');
  });

  // ====== Start Server ======
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`✅ REST server on http://localhost:${PORT}`);
      console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
