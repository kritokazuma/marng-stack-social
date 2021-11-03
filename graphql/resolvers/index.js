const userMutation = require("../resolvers/users");
const postMutation = require("../resolvers/posts");
const commentMutation = require("../resolvers/comment");
module.exports = {
  Post: {
    commentCount: (root) => root.comments.length,
    likeCount: (root) => root.likes.length,
  },
  Query: {
    ...postMutation.Query,
  },
  Mutation: {
    ...userMutation.Mutation,
    ...postMutation.Mutation,
    ...commentMutation.Mutation,
  },
};
