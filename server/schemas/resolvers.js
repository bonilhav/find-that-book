const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { userId, input }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                {
                    $addToSet: { savedBooks: input },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },

        removeBook: async (parent, { userId, input }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: input } },
                { new: true }
            );
        },
    }
};

module.exports = resolvers;