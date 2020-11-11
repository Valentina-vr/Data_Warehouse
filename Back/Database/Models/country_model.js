const { DataTypes } = require('sequelize');
const sequelize = require('../server');


const countryModel = sequelize.define(
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

module.exports = countryModel;