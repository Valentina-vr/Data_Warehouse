const { DataTypes } = require('sequelize');
const sequelize = require('../server');


const contactModel = sequelize.define(
  'contacts',
  {
    name: {
      type: DataTypes.STRING(50),
			allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(50),
			allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
			allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
			allowNull: false,
    },
    company: {
      type: DataTypes.STRING(50),
			allowNull: false,
    },
    region: {
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
    interest: {
      type: DataTypes.INTEGER,
			allowNull: false,
    }
  },
  {
    timestamps: true
  }
);



module.exports = contactModel;