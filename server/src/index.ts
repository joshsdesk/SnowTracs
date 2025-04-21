// ====== Core Imports ======
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// ====== Local Imports ======
import db from './config/connection';
import { typeDefs, resolvers } from './schema';
import mapRoutes from './routes/map';
import resortRoutes from './routes/resortRoutes';
import { authMiddleware } from './middleware/auth';
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
  app.use(express.json());

  // ====== REST Routes ======
  app.use('/map', mapRoutes);
  app.use('/resort', resortRoutes);

  // ====== GraphQL Endpoint ======
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      // ✅ This context function calls authMiddleware
      // It checks for a JWT in the Authorization header,
      // verifies it, and attaches the decoded `user` object
      // to the GraphQL context so it's accessible in resolvers
      context: authMiddleware
    })
  );

  // ====== Serve Vite-Built Frontend ======
  const clientPath = path.resolve(__dirname, '../../client/dist');
  app.use(express.static(clientPath));

  // ====== Catch-All for Client Routing ======
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
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
