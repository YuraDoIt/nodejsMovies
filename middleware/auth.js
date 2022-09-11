const jwt = require('jsonwebtoken');
const config = require('../config/config');
const jwtExpiration = require('jwt-check-expiration');

const dbUser = require('../Models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    console.log(token)
    console.log(jwtExpiration(token));
    // if(jwtExpiration(token) == true) {
    //   throw new Error('jwt has expired')
    // }

    const decodedToken = jwt.verify(token, 
      `${config.tokenKey}`);
    
    console.log(decodedToken);
    console.log(decodedToken.iat)

    const userId = decodedToken;

    let userFromDb = await dbUser.findOne({user_id: userId});
    if(!userFromDb) {
      throw 'Users not registered yet'
    }

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}