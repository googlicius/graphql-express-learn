const express = require('express')
const graphqlHTTP = require('express-graphql')
var { buildSchema } = require('graphql')
var RandomDice = require('./random-dice')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type RandomDice {
        numSides: Int!
        rollOne: Int!
        role(numRolls: Int!): [Int]
    }
    type Query {
        getDice(numSides: Int!): RandomDice
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