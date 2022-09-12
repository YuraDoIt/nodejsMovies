const express = require('express');

const mainService = require('../services/importFile');

const router = express.Router();

router
  .route('/')
  .get(mainService.RenderMain)
  .post(mainService.PostMain)

module.exports = router;