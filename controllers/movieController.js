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

exports.deleteMovieById = async (req, res, next) => {
  try{
    const requestId = req.params.id;
    const movie = await Movie.destroy({ where: {movie_id: requestId}});
      
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

exports.findMovieByTitle = async (req, res, next) => {
  try{
    const requestTitle = req.body.Title;
    console.log(requestTitle);
    
    const movie = await Movie.findAll({ where: {Title: requestTitle}});
      
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

exports.MoviesList = async (req, res, next) => {
  try{
    const requestSort = req.query.sort;
    const orderType = req.query.order;
    const limit = req.query.limit;
    const offset = req.query.offset;
    console.log(requestSort)
    console.log(orderType);
    console.log(limit);
    console.log(offset);

    const movie = await Movie.findAll(
      { where: 
        {
          Title: requestTitle
        },
        order: ['Title', `${orderType}`]
      }
    );
      
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
