const {Sequelize } = require('sequelize');

const sequelize = new Sequelize('movies', 'user', 'password', {
  dialect: 'sqlite',
  host: './dev.sqlite'
});

//host: './dev.sqlite'
//host: ':memory:'

module.exports = sequelize;