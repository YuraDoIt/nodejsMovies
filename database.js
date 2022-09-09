const {Sequelize } = require('sequelize');

const sequelize = new Sequelize('movies', 'user', 'password', {
  dialect: 'sqlite',
  host: ':memory:'
});

//host: './dev.sqlite'

module.exports = sequelize;