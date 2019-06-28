const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
var cors = require("cors");
const app = express();
app.use('*', cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(9000);