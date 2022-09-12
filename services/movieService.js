const Movie = require('../Models/Movie');

exports.CreateMovie = async (req, res, next) => {
  try {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "no inputed data"
      })    }

    const movie = await Movie.create(req.body);
      console.log(movie)
      return res.status(200).json({
        data: movie,
        status: "succes",
        results: movie.length,
      });

  }
  catch(err) {
    return res.status(400).json({
      status: "fail",
      message: "can't make create movie query"
    })
  }
}

exports.getAllMovies = async (req, res, next) => {
  try{
    const movie = await Movie.findAll();
      
      return res.status(200).json({
        data: movie,
        status: "succes",
        results: movie.length,
      });

  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "can't make getAllMovies query"
    })
  }
}

exports.getMovieById = async (req, res, next) => {
  try{
    const requestId = req.params.id;
    const movie = await Movie.findOne({ where: {movie_id: requestId}});
      
      return res.status(200).json({
        data: movie,
        status: "succes",
        results: movie.length,
      });

  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "can't make getMovieById query"
    })
  }
}

exports.updateMovie = async(req, res, next) => {
    const requestId = req.params.id;
    if(Movie.findOne({where: {movie_id: requestId}})) {
      res.status(400).send('This movie not exist')
    }
    await Movie.update(req.body, { where: {movie_id: requestId} })
    const result = await Movie.findOne({where: {movie_id: requestId}})

    return res.status(200).json({
      data: result
    })
}

exports.deleteMovieById = async (req, res, next) => {
  try{
    const requestId = req.params.id;
    const movie = await Movie.destroy({ where: {movie_id: requestId}});
      
    return res.status(200).json({
        data: movie,
        status: "succes",
        results: movie.length,
      });

  } catch (err) {
    return res.status(400).json({
      status: "fail",
    })
  }
}

exports.findMovieByTitle = async (req, res, next) => {
  try{
    const requestTitle = req.body.title;
    
    const movie = await Movie.findAll({ where: {title: requestTitle}});
      
    return res.status(200).json({
        data: movie,
        status: "succes",
        results: movie.length,
      });

  } catch (err) {
    return res.status(400).json({
      status: "fail",
    })
  }
}

exports.MoviesList = async (req, res, next) => {
    const actor = req.query.actor;
    let title = req.query.title;
    let queryCommand = { };
    if(actor) {
      queryCommand = Object.assign(queryCommand, {
        stars: `${actor}`
      })
    }
    if(title) {
      queryCommand = Object.assign(queryCommand, {
        title: `${title}`
      })
    }
    console.log(queryCommand)

    //!Sort
    let requestSort = req.query.sort;
    if(!req.query.sort){
      requestSort = movie_id;
    }
    if(requestSort != 'id' || requestSort != 'title' || requestSort != 'year'){
      return res.status(400).json({
        status: "fail",
        message: "query sort is not appropriate"
      })
    }

    //!Order
    let orderType = (req.query.order).toString();
    if(!req.query.order){
      orderType = 'ASC';
    }

    //!limit
    let limit = req.query.limit;
    if(!req.query.limit){
      limit = 20;
    }

    //!offset
    let offset = req.query.offset;
    if(!req.query.offset){
      offset = 0;
    }

    const movie = await Movie.findAll(
      { where: 
        queryCommand,
        order: [
          ['title', `${orderType}`]
        ],
        limit: limit,
        offset: offset,
      }
    );
      
    return res.status(200).json({
      data: movie,
      status: "succes",
      results: movie.length,
    });
}
