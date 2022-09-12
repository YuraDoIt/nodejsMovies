const Movie = require('../Models/Movie');

exports.RenderMain = (req, res, next) => {
  res.sendFile(__dirname + "/public/index.html");
}

exports.PostMain = async (req, res, next) => {
  if(req.files) {
    let obj = {};
    let file = req.files.file;
    let filename = file.name;
    if(filename != 'sample_movies.txt') {
      return res.status(400).json({
        status: 2,
        message: 'This file is not correct',
      })
    }
    
    let dataFile = file.data.toString();

    const arr = [];
    const regex = /(?<=((Title:|Release Year:|Format:|Stars:)\s)).+/gm;
    const regexData = dataFile.match(regex);

    if (!regexData) return arr;

    for (let i = 0; i < regexData.length - 3; i += 4) {
      arr.push({
        title: regexData[i].trim(),
        release_Year: regexData[i + 1].trim(),
        format: regexData[i + 2].trim(),
        stars: [...new Set(regexData[i + 3].split(', ').map((actor) => actor.trim()))],
      });
  }

  for(let i = 0; i<arr.length; i++) {
    await Movie.create(arr[i]);
  }  

    return res.status(200).redirect('/');
  }
}