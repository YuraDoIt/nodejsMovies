const express = require('express');
const upload = require('express-fileupload');
var fs = require('fs');

const config = {
  baseURL: process.env.BASEURL,
}

const app = express();

app.use(upload());
app.use(express.static("public"));

const port = process.env.PORT || 8050;
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

app.listen(port, () => {
  console.log(`server start on port ${port}`)
})