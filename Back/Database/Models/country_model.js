const { DataTypes } = require('sequelize');
const sequelize = require('../server');
const region = require("../Models/region_model");

const country = sequelize.define(
  'country',
  {
      
    name: {
      type: DataTypes.STRING(50),
			allowNull: false,
    }
  },
  {
    timestamps: true
  }
);

region.hasMany(country);
country.belongsTo(region);

module.exports = country;