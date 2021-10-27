const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    messages: [Message]
  }

  type Message {
    _id: ID
    content: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    messages(username: String): [Message]
    message(_id: ID!): Message
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addMessage(content: String!): Message
  }
`;

module.exports = typeDefs;
