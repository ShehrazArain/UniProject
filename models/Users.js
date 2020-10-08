const Sequelize = require('sequelize')
const db = require('../config/db')

const Users = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date_of_register: {
    type: Sequelize.DATE
  }
},
  {
    timestamps: false //otherwise set createdAT and updatedAT by default
  }
);

module.exports = Users;