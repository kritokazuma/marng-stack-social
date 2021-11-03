import { gql } from "@apollo/client";

export const FETCH_ALL_POST = gql`
  query {
    getPosts {
      id
      username
      body
      createdAt
      commentCount
      comments {
        id
        username
        body
      }
      likeCount
      likes {
        id
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;

export const REGISTER = gql`
  mutation Mutation(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      token
      id
    }
  }
`;

export const CREATE_POST = gql`
  mutation Mutation($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const LIKE_POST = gql`
  mutation createLike($postId: String!) {
    createLike(postId: $postId) {
      username
      id
      createdAt
      comments {
        id
        username
        createdAt
      }
      likes {
        id
        username
      }
      likeCount
      commentCount
    }
  }
`;

export const SINGLE_POST = gql`
  query getPost($postId: String!) {
    getPost(postId: $postId) {
      username
      body
      id
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      username
      id
      body
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: String!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      username
      body
      createdAt
      id
      comments {
        id
        username
        body
      }
      commentCount
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
