const express = require('express');
const helmet = require('helmet');
const jwt = require("jsonwebtoken");
const sequelize = require("./Database/server");
const cors = require("cors");
require('dotenv').config();


//Express
const app = express();
app.use(helmet());
app.use(express.json());

//Models
const cityModel = require("./Database/Models/city");
const companyModel = require("./Database/Models/company");
const contactModel = require("./Database/Models/contacts");
const countryModel = require("./Database/Models/country");
const regionModel = require("./Database/Models/region");
const userModel = require("./Database/Models/users");
cityModel.sync();
companyModel.sync();
contactModel.sync();
countryModel.sync();
regionModel.sync();
userModel.sync();

//Starting the server
app.listen(process.env.PORT, ()=> {
    console.log('Server running through the port '+process.env.PORT);
});