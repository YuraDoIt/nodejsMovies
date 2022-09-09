const Movie = require('../Models/Movie');

exports.CreateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
      
      res.status(200).json({
        data: {
          movie
        },
        status: "succes",
        results: movie.length,
      });

  }
  catch(err) {
    res.status(400).json({
      status: "fail",
    })
    console.log(err);
  }
}

exports.getAllMovies = async (req, res, next) => {
  try{
    const movie = await Movie.findAll();
      
      res.status(200).json({
        data: {
          movie
        },
        status: "succes",
        results: movie.length,
      });

  } catch (err) {
    res.status(400).json({
      status: "fail",
    })
    console.log(err);
  }
}

exports.getMovieById = async (req, res, next) => {
  try{
    const requestId = req.params.id;
    const movie = await Movie.findOne({ where: {movie_id: requestId}});
      
      res.status(200).json({
        data: {
          movie
        },
        status: "succes",
        results: movie.length,
      });

  } catch (err) {
    res.status(400).json({
      status: "fail",
    })
    console.log(err);
  }
}