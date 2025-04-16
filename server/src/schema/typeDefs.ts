import { gql } from 'graphql-tag';

const typeDefs = gql`
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

  type Query {
    resorts: [Resort]
    resort(name: String!): Resort
  }
`;

export default typeDefs;
