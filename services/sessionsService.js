const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.sessionsCreate = async(req, res, next) => {
  const {email, password} = req.body;

  if(!email || !password) {
    return res
    .status(404)
    .send(
      {
        message: 'password or email is empty',
        status: 2
     });
  }

  const currentUser = await User.findOne({where: 
    {email: email}}
  );
  if(!currentUser){
    return res
    .status(404)
    .send(
      {
        message: 'This user not exist',
        status: 2
     });
  }

  if(!(await bcrypt.compare(password,currentUser.dataValues.password))) {
    return res
        .status(404)
        .send(
          {
            message: 'password not compare',
            status: 2
         });
  }
  
  const token = jwt.sign(
    {
      user_id: currentUser.user_id,
      email
    },
    `${config.tokenKey}`,
    {
      expiresIn: "1h"
    }
  )

  res.status(201).send({
    token: token,
    status: 1,
  });
}