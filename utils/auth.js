const { AuthenticationError } = require("apollo-server-core");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
          const getUser = await User.findById(user.id);
          return getUser;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error('Authentication token must be "Bearer [token]"');
  }
  throw new Error("Authorization header must be provided");
};
