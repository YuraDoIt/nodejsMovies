const jwt = require('jsonwebtoken');
const config = require('../config/config');

const dbUser = require('../Models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const dateTimeNow = getTimestampInSeconds();
    const decodedToken = jwt.verify(token, 
      `${config.tokenKey}`);

    console.log(dateTimeNow + " " + decodedToken.iat )
    if(dateTimeNow > decodedToken.exp) {
      return res.status(400).send({
        error: 'date time of token is expired'
      });
    }
    
    console.log(decodedToken);
    console.log(decodedToken.exp)

    const {email} = decodedToken;
    console.log(email + " email")

    let userFromDb = await dbUser.findOne({email: email});
    if(!userFromDb) {
      return res.status(400).send({
        error: 'user not found'
      }); 
    }
      next();
  } catch {
    res.status(400).send({
      error: 'no authorization token'
    });
  }
}

function getTimestampInSeconds () {
  return Math.floor(Date.now() / 1000)
}