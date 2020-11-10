const { DataTypes } = require('sequelize');
const sequelize = require('../server');

const cityModel = sequelize.define(
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



module.exports = cityModel;