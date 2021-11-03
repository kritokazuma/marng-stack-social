const { gql } = require("apollo-server-core");

module.exports = gql`
  type User {
    username: String!
    email: String!
    token: String!
    id: ID!
  }

  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    commentCount: Int!
    likeCount: Int!
  }

  type Comment {
    body: String
    username: String
    id: ID!
    createdAt: String!
  }

  type Like {
    username: String!
    id: ID!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: String!): Post!
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
    login(username: String!, password: String!): User!

    createPost(body: String!): Post!
    deletePost(postId: ID!): String!

    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: String!, commentId: String!): Post!

    createLike(postId: String!): Post!
  }
`;
