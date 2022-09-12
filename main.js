const express = require('express');
const upload = require('express-fileupload');
const fs = require('fs');
const config = require('./config/config');
const chalk=require("chalk");

const sequelize = require('./database');
const auth = require('./middleware/auth');
const movieRouter = require('./routers/movieRoutes');
const userRouter = require('./routers/userRoutes');
const sessionRouter = require('./routers/sessionsRoutes');
const mainRouter = require('./routers/mainRoutes');

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(upload());

sequelize.sync({force: true}).then(() =>  {
  console.log(chalk.yellow('db is ready'))
});

let movies = fs.readFile('sample_movies.txt', 'utf-8', function(err, data) {
  if(err) throw err;
  // console.log(data);
  var cells = data.split('\n\n');
  // console.log(cells)
  return data;
})

app.use('/', mainRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/movies', auth, movieRouter);
app.use('/api/v1/sessions', sessionRouter)

app.listen(config.port, () => {
  console.log(chalk.blue(`server start on port ${config.port}`));
})