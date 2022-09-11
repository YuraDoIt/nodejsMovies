const express = require('express');
const upload = require('express-fileupload');
const fs = require('fs');

const config = require('./config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth')
const movieController = require('./controllers/movieController');
const sequelize = require('./database');

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(upload());

const User = require('./Models/User');
sequelize.sync({force: true}).then(() =>  {
  console.log('db is ready')
});

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

app.post('/api/v1/users', async (req, res) => {
  const {email , name, password, confirmPassword} = req.body;
  console.log(email, name,  password)

  if(!(email, name, password)) {
    res.status(400).send("All input is required");
  }

  if(password != confirmPassword) {
    res.status(400).send("password not match")
    throw new Error('password not match');
  }

  let encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email: email.toLowerCase(),
    name,
    password: encryptedPassword
  })

  const token = jwt.sign(
    {
      name,
      user_id: user.user_id,
      email
    },
    `${config.tokenKey}`,
    {
      expiresIn: "1h"
    }
  )
  console.log(token)
  res.status(201).send({
    token: token,
    status: 1,
  });
});

app.get('/users', auth, async (req, res) => {
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
app.post('/api/v1/movies', movieController.CreateMovie);
app.get('/api/v1/movies',  movieController.getAllMovies);
app.get('/api/v1/movies/:id', movieController.getMovieById);
app.patch('/api/v1/movies/:id', movieController.updateMovie);
app.delete('/api/v1/movies/:id', movieController.deleteMovieById);
app.get('/api/v1/movie/Title', movieController.findMovieByTitle);
app.get('/api/v1/movie/list',  movieController.MoviesList)

app.listen(config.port, () => {
  console.log(`server start on port ${config.port}`)
})