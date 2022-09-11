const jwt = require('jsonwebtoken');
const config = require('../config/config');
const jwtExpiration = require('jwt-check-expiration');

const dbUser = require('../Models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const dateTimeNow = getTimestampInSeconds();
    const decodedToken = jwt.verify(token, 
      `${config.tokenKey}`);

    console.log(dateTimeNow + " " + decodedToken.iat )
    if(dateTimeNow > decodedToken.exp) {
      res.status(400).send({
        error: 'date time of token is expired'
      });
    }
    
    console.log(decodedToken);
    console.log(decodedToken.exp)

    const {email} = decodedToken;
    console.log(email + " email")

    let userFromDb = await dbUser.findOne({email: email});
    if(!userFromDb) {
      res.status(400).send({
        error: 'date time of token is expired'
      }); 
    }
      next();
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}

function getTimestampInSeconds () {
  return Math.floor(Date.now() / 1000)
}