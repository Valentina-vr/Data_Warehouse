const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER, process.env.PASS,{
    host: process.env.HOST,
    dialect: 'mysql'
});

sequelize.authenticate().then(()=>{
    console.log('Database connected successfully');
})
.catch(error => {
    console.log('Database disconnected');
});

module.exports = sequelize;