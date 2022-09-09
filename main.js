const express = require('express');
const upload = require('express-fileupload');
var fs = require('fs');

const app = express();

app.use(upload());

const port = process.env.PORT || 3009;
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
  // let jsonObj = {"name": 124};
  // res.send("5lk3j5kl3j")
  res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
  if(req.files) {
    console.log(req.files)

    let file = req.files.file;
    console.log(file)
    // let filename = file.name
  }
})

app.listen(port, () => {
  // console.log(movies);
  console.log(`server start on port ${port}`)
})