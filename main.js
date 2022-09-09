const express = require('express');
const upload = require('express-fileupload');
const sequelize = require('./database');
var fs = require('fs');

var config = require('./config/config');
const User = require('./Models/User');
const Movie = require('./Models/Movie');

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(upload());

sequelize.sync({force: true}).then(() =>  {
  console.log('db is ready')
});

const movieController = require('./controllers/movieController');

// const txtToJson = require("txt-file-to-json");
// const dataInJson = txtToJson({ filePath: "./sample_movies.txt" });

let movies = fs.readFile('sample_movies.txt', 'utf-8', function(err, data) {
  if(err) throw err;
  // console.log(data);
  var cells = data.split('\n\n');
  // console.log(cells)
  return data;
})


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
  if(req.files) {
    let obj = {};
    let file = req.files.file;
    let filename = file.name;
    let dataFile = file.data.toString();
    // console.log(JSON.parse(dataFile));
  }
})

app.post('/users', async (req, res) => {
  const user = req.body;
  if(user.password != user.confirmPassword) {
    res.send("password not match")
    throw new Error('password not match');
  }
  await User.create(req.body)

  res.send('user is inserted');
});

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

app.get('/users/:id', async (req, res) => {
  const requestId = req.params.id;
  const user = await User.findOne({ where: {user_id: requestId} });
  if(!user) {
    res.send('This user not exist')
  } else
  res.send(user);
})

app.put('/users/:id', async (req, res) => {
  const requestId = req.params.id;
  const user = await User.findOne({ where: {user_id: requestId} });
  user.email = req.body.email;
  await user.save();

  res.send(user);
});

app.delete('/users/:id', async (req, res) => {
  const requestId = req.params.id;
  const user = await User.destroy({ where: {user_id: requestId} });
  user.email = req.body.email;
  await user.save();

  res.send(user);
});

//
app.post('/movies', movieController.CreateMovie);
app.get('/movies', movieController.getAllMovies);
app.get('/movies/:id', movieController.getMovieById)

app.listen(config.port, () => {
  console.log(`server start on port ${config.port}`)
})