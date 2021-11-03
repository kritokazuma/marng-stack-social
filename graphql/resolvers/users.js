const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const { UserInputError } = require("apollo-server-core");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");

const generatedToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "5d" }
  );
  return token;
};

module.exports = {
  Mutation: {
    register: async (_, { username, email, password, confirmPassword }) => {
      const { errors, valid } = await validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username already taken", {
          errors: {
            username: 'username is taken'
          }
        });
      }
      password = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password,
      });

      const res = await newUser.save();
      const token = generatedToken(res);
      return {
        id: res.id,
        username: res.username,
        email: res.email,
        token,
      };
    },

    login: async (_, { username, password }) => {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      const checkPass = user
        ? await bcrypt.compare(password, user.password)
        : false;

      if (!checkPass) throw new UserInputError("Wrong username or password");

      const token = generatedToken(user);
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        token,
      };
    },
  },
};
