const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database')

class Movie extends Model {}

Movie.init({
  movie_id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
  },
  Title: {
    type: DataTypes.STRING,
  },
  Release_Year: {
    type: DataTypes.INTEGER
  },
  Format: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'movie'
});

module.exports = Movie;