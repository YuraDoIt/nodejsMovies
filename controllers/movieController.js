const Movie = require('../Models/Movie');

exports.CreateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
      
      res.status(200).json({
        data: movie,
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
        data: movie,
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
        data: movie,
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

exports.updateMovie = async(req, res, next) => {
    const requestId = req.params.id;
    if(Movie.findOne({where: {movie_id: requestId}})) {
      res.status(400).send('This user not exist')
    }
    await Movie.update(req.body, { where: {movie_id: requestId} })
    const result = await Movie.findOne({where: {movie_id: requestId}})

    res.status(200).json({
      data: result
    })
}

exports.deleteMovieById = async (req, res, next) => {
  try{
    const requestId = req.params.id;
    const movie = await Movie.destroy({ where: {movie_id: requestId}});
      
      res.status(200).json({
        data: movie,
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
        data: movie,
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
    const actor = req.query.actor;
    let title = req.query.title;
    let queryCommand = { };
    if(actor) {
      queryCommand = Object.assign(queryCommand, {
        Stars: `${actor}`
      })
    }
    if(title) {
      queryCommand = Object.assign(queryCommand, {
        Title: `${title}`
      })
    }
    console.log(queryCommand)

    let requestSort = req.query.sort;
    if(!req.query.sort){
      requestSort = movie_id;
    }

    let orderType = (req.query.order).toString();
    if(!req.query.order){
      orderType = 'ASC';
    }

    let limit = req.query.limit;
    if(!req.query.limit){
      limit = 20;
    }
    let offset = req.query.offset;
    if(!req.query.offset){
      offset = 0;
    }

    const movie = await Movie.findAll(
      { where: 
        queryCommand,
        order: [
          ['Title', `${orderType}`]
        ],
        limit: limit,
        offset: offset,
      }
    );
      
    res.status(200).json({
      data: movie,
      status: "succes",
      results: movie.length,
    });
}
