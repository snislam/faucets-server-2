const express = require('express');
const authRouter = require('./auth.route')
const optionRouter = require('./options.route')
const router = express.Router();

router.use('/auth', authRouter)
router.use('/option', optionRouter)

module.exports = router