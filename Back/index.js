const express = require('express');
const helmet = require('helmet');
const sequelize = require("./Database/server");
const cors = require("cors");
require('dotenv').config();

//Express
const app = express();
app.use(helmet());
app.use(express.json());

//Models
const cityModel = require("./Database/Models/city_model");
const companyModel = require("./Database/Models/company_model");
const contactModel = require("./Database/Models/contact_model");
const countryModel = require("./Database/Models/country_model");
const regionModel = require("./Database/Models/region_model");
const userModel = require("./Database/Models/users_model");
cityModel.sync();
companyModel.sync();
contactModel.sync();
countryModel.sync();
regionModel.sync();
userModel.sync();

//Routes require
const userRoute = require("./Routes/user_routes");
const companyRoute = require("./Routes/company_routes");

//Cors
app.use(cors());
app.options("*", cors());

//Routes
app.use("/users", userRoute);
app.use("/company", companyRoute);

//Starting the server
app.listen(process.env.PORT, ()=> {
    console.log('Server running through the port '+process.env.PORT);
});