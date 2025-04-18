import { gql } from 'graphql-tag';

const typeDefs = gql`
  # === Resort Type ===
  type Resort {
    id: ID!
    name: String!
    trails_open: Int
    trails_total: Int
    lifts_open: Int
    lifts_total: Int
    gondolas_open: Int
    gondolas_total: Int
    snowpack_in: Int
    hours: String
    website: String
    image: String
    latitude: Float
    longitude: Float
  }

  # === User Auth Types ===
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  # === Root Queries ===
  type Query {
    resorts: [Resort]
    resort(name: String!): Resort
    me: User
  }

  # === Root Mutations ===
  type Mutation {
    register(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;
