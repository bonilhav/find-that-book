const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookId: String!, authors: [String], image: String, link: String, title: String, description: String): User
        removeBook(bookId: ID!): User
    }    

    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String!
        authors: [String]
        image: String
        link: String
        title: String
        description: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(userId: ID!): User
    }
`

module.exports = typeDefs;