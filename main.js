const express = require('express');
const upload = require('express-fileupload');
const sequelize = require('./database')
var fs = require('fs');
var config = require('./config');

const app = express();

sequelize.sync().then(() =>  {
  console.log('db is ready')
})

app.use(upload());
app.use(express.static("public"));


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
    console.log(JSON.parse(dataFile));
    
  }
})

app.listen(config.port, () => {
  console.log(`server start on port ${config.port}`)
})