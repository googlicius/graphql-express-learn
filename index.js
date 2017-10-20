const express = require('express')
const graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql')
var RandomDice = require('./random-dice')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    input MessageInput {
        content: String
        author: String
    }
    type Message {
        id: ID!
        content: String
        author: String
    }
    type Query {
        getMessage(id: ID!): Message
    }
    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
    }
`)

// The root provides a resolver function for each API endpoint
var root = {
    getDice: ({numSides}) => new RandomDice(numSides || 6)
}

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql');