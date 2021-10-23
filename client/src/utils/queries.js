import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;
export const QUERY_MESSAGES = gql`
  query messages($username: String) {
    messages(username: $username) {
      _id
      content
      createdAt
      username
      to
    }
  }
`;

export const QUERY_MESSAGE = gql`
  query message($id: ID!) {
    message(_id: $id) {
      _id
      content
      createdAt
      username
      to
    }
  }
`;
