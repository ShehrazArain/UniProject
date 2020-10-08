const Sequelize = require('sequelize')
const db = require('../config/db')
const Users = require('./Users')

const Contacts = db.define('contacts', {
  user: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users', // 'persons' refers to table name
      key: 'id', // 'id' refers to column name in persons table
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: Sequelize.STRING,
  type: {
    type: Sequelize.STRING,
    defaultValue: 'personal'
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  }
},
  {
    timestamps: false
  }
);
// Users.hasMany(Contacts);

module.exports = Contacts;