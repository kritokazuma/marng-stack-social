const { UserInputError, AuthenticationError } = require("apollo-server-core");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/auth");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPost: async (_, { postId }) => {
        const post = await Post.findById(postId)
        if (post) return post
        throw new UserInputError('post not found')
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = await checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Post body must not be empty");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
      });

      const post = await newPost.save();
      return post;
    },

    deletePost: async (_, { postId }, context) => {
      const user = await checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.username === user.username) {
          await post.delete()
          return "successfully deleted";
        } else {
          throw new AuthenticationError('not allowed')
        }
      } else throw new UserInputError('post not found')
    },
  },
};
