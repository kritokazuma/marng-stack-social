const { UserInputError, AuthenticationError } = require("apollo-server-core");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/auth");
module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      if (body.trim() === "") {
        throw new UserInputError("comment must not be empty");
      }

      const user = await checkAuth(context);
      const post = await Post.findById(postId);

      post.comments.unshift({
        body,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      await post.save();
      return post;
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const user = await checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].username === user.username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },

    createLike: async (_, { postId }, context) => {
      const user = await checkAuth(context)
      const post = await Post.findById(postId)
      if (post) {
        if (post.likes.find(like => like.username === user.username)) {
          //unlike
          post.likes = post.likes.filter(p => p.username !== user.username)
        } else {
          post.likes.push({
            username: user.username,
            createdAt: new Date().toISOString()
          })
        }
        await post.save()
        return post
      } else throw new UserInputError('post not found')
    }
  },
};
