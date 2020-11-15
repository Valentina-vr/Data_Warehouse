const { DataTypes } = require('sequelize');
const sequelize = require('../server');


const companyModel = sequelize.define(
  'company',
  {
      
    name: {
      type: DataTypes.STRING(50),
			allowNull: false,
    },
    country: {
      type: DataTypes.STRING(50),
			allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
			allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
			allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
			allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(50),
			allowNull: false,
    }
  },
  {
    timestamps: true
  }
);



module.exports = companyModel;