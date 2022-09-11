const express = require('express');

const movieService = require('../services/movieService');

const router = express.Router();

router
  .route('/')
  .get(movieService.getAllMovies)
  .post(movieService.CreateMovie)

router.route('/:id')
  .get(movieService.getMovieById)
  .patch(movieService.updateMovie)
  .delete(movieService.deleteMovieById)

router
  .route('/title')
  .get(movieService.findMovieByTitle)

router
  .route('/list')
  .get(movieService.MoviesList)


module.exports = router;