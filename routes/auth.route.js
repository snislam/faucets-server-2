const express = require('express');
const { registerController, validateName } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', registerController)
router.post('/validateName', validateName)

module.exports = router;