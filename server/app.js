const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross-origin requests - CORS
app.use(cors());

//connect to mlab database
mongoose.connect('mongodb://pax-admin:123abc@ds223015.mlab.com:23015/devices');
mongoose.connection.once('open', () => {
    console.log('connected to the database in mlab');
});

app.use('/graphql', graphqlHTTP({ 
    schema,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('now listening for requests on port: 4000');
});