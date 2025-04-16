// ====== Core Imports ======
import express, { Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// ====== Local Imports ======
import db from './config/connection';
import { typeDefs, resolvers } from './schema';
import mapRoutes from './routes/map';
import resortRoutes from './routes/resortRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ====== Apollo Server Setup ======
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  await server.start();

  // ====== Middleware ======
  app.use(cors());
  app.use(express.json()); // ✅ Use only express.json()

  // ====== REST Routes ======
  app.use('/map', mapRoutes);
  app.use('/resort', resortRoutes);

  // ====== GraphQL Endpoint ======
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.authorization || null,
      }),
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
