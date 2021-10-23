const { AuthenticationError } = require("apollo-server-express");
const { User, Message } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select("-__v -password").populate("messages");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("messages");
    },
    messages: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Message.find(params).sort({ createdAt: -1 });
    },
    message: async (parent, { _id }) => {
      return Message.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    sendMessage: async (parent, { to, content }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in!");
        }

        const recipient = await User.findOne({ username: to });
        if (!recipient) {
          throw new UserInputError("USer not found");
        }

        if (content.trim() === "") {
          throw new UserInputError("Message is empty");
        }

        const message = await Message.create({
          from: context.user.username,
          to,
          content,
        });

        return message;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
