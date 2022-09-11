const express = require('express');

const userService = require('../services/userService');

const router = express.Router();

router
  .route('/')
  .post(userService.createUser)
  .get(userService.getAllUsers)

router
  .route('/:id')
  .delete(userService.deleteUserById)

module.exports = router;