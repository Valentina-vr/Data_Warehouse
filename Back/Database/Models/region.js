const { DataTypes } = require('sequelize');
const sequelize = require('../server');

const regionModel = sequelize.define(
  'region',
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


module.exports = regionModel;