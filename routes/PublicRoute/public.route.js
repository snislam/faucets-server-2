const express = require('express');
const { registerController, validateName, validateEmail, validatePassword, loginEmailvalidation, loginPasswordValidation, loginController } = require('../../controllers/auth.controller');
const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/validateLoginEmail', loginEmailvalidation)
router.post('/validateLoginPassword', loginPasswordValidation)
router.post('/validateName', validateName)
router.post('/validateEmail', validateEmail)
router.post('/validatePassword', validatePassword)

module.exports = router;