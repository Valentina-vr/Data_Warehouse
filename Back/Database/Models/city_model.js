const { DataTypes } = require('sequelize');
const sequelize = require('../server');
const country = require("../Models/country_model");

const city = sequelize.define(
  'city',
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

country.hasMany(city);
city.belongsTo(country);

module.exports = city;