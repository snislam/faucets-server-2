const express = require('express');
const { optionGetController, optionPostController } = require('../../controllers/options.controller');
const router = express.Router();

router.get('/option', optionGetController)
router.post('/option', optionPostController)

module.exports = router;