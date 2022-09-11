const express = require('express');
const upload = require('express-fileupload');
const fs = require('fs');
const config = require('./config/config');

const sequelize = require('./database');
const auth = require('./middleware/auth');
const userService = require('./services/userService');
const movieRouter = require('./routers/movieRoutes');
const userRouter = require('./routers/userRoutes');
const sessionRouter = require('./routers/sessionsRoutes');

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(upload());

sequelize.sync({force: true}).then(() =>  {
  console.log('db is ready')
});

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
    console.log(dataFile);

    const arr = [];
  const regex = /(?<=((Title:|Release Year:|Format:|Stars:)\s)).+/gm;
  const regexData = dataFile.match(regex);

  if (!regexData) return arr;

  for (let i = 0; i < regexData.length - 3; i += 4) {
    arr.push({
      Title: regexData[i].trim(),
      year: regexData[i + 1].trim(),
      format: regexData[i + 2].trim(),
      actors: [...new Set(regexData[i + 3].split(', ').map((actor) => actor.trim()))],
    });
  }

  console.log(arr);
  }
})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/sessions', sessionRouter)

app.listen(config.port, () => {
  console.log(`server start on port ${config.port}`)
})