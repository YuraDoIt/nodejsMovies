const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

exports.createUser = async(req, res, next) => {
  const {email , name, password, confirmPassword} = req.body;
  console.log(email, name,  password)

  if(!(email, name, password)) {
    res.status(400).send("All input is required");
  }

  if(await User.findOne({email: email})){
    return res.status(400).json({
      status: "fail",
      message: "user already exist"
    })
  }

  if(password != confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message: "password not match"
    })
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
  return res.status(201).send({
    token: token,
    status: 1,
  });
}

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  return res.send(users);
}

exports.getUserById =  async (req, res) => {
  const requestId = req.params.id;
  const user = await User.findOne({ where: {user_id: requestId} });
  if(!user) {
    return res.status(400).json({
      status: "fail",
      message: "user not exist"
    })
  } else
  return res.send(user);
}

exports.deleteUserById = async (req, res) => {
  const requestId = req.params.id;
  await User.destroy({ where: {user_id: requestId} });

  res.status(201).json({
    status: "succes",
  });
}

exports.updateUserById = async (req, res) => {
  const requestId = req.params.id;

  if(!await User.findOne({where: {user_is: requestId}})) {
    return res.status(400).json({
      status: "fail",
      message: "user not exist"
    })
  }

  const user = await User.findOne({ where: {user_id: requestId} });
  user.email = req.body.email;
  await user.save();

  res.send(user);
}