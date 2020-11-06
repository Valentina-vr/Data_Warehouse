const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

//Express
const app = express();
app.use(helmet());
app.use(express.json());

//Database
const db = require('./Database/server');

//Starting the server
app.listen(process.env.PORT, ()=> {
    console.log('Server running through the port '+process.env.PORT);
});