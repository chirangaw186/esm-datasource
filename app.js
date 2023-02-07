const express = require('express');
const app = express();

const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const {query} = require('./schema/queries');
const {mutation} = require('./schema/mutations');

const graphqlHTTPHandler = require('express-graphql').graphqlHTTP;

const schema = new GraphQLSchema({
    query,
    mutation
});

app.use('/',
    graphqlHTTPHandler({
        schema: schema,
        graphiql: true
    })
)

app.listen(3000, ()=>{
    console.log("Server is listening on port : 3000")
})