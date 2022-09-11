const express = require('express');

const sessionService = require('../services/sessionsService');

const router = express.Router();

router
  .route('/')
  .post(sessionService.sessionsCreate)

module.exports = router;