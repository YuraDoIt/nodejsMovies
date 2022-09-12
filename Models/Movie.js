const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database')

class Movie extends Model {}

Movie.init({
  movie_id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
  },
  release_Year: {
    type: DataTypes.INTEGER
  },
  format: {
    type: DataTypes.ENUM,
    values: ['VHS','DVD','Blu-ray']
  },
  stars: [
    DataTypes.STRING,
  ]
}, {
  sequelize,
  modelName: 'movie',
  timestamps: false
});

module.exports = Movie;