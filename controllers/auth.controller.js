const User = require("../models/auth.model")
const jwt = require('jsonwebtoken');

// token verifier
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send({ message: "Unautorized" })
    
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403).send({ message: "Unautorized" })
        req.user = user
        next()
    })
}
    

// register api
const registerController = async (req, res) => {
    try {
        const user = new User(req.body)
        const newUser = await user.save()
        res.status(201).send({
            message: "All data",
            data: newUser
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}


//  login api
const loginController = async (req, res) => {
    try {
        const user = req.body;
        const access_token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
        
        res.status(200).send({
            token: access_token,
            duration: 3600000
        })

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}

// login email validation controller
const loginEmailvalidation = async (req, res) => {
    try {
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const { email } = req.body
        const checkEmail = await User.findOne({ email: email })
        if (!email) {
            res.send({ error: "Email is required" })
        }
        else if (!filter.test(email)) {
            res.send({ error: "Please enter a valid email" })
        }
        else if (!checkEmail) {
            res.send({
                error: "This email is not registered."
            })
        } else {
            res.send({ success: "Validated" })
        }
    } catch (error) {
        res.send({
            message: "Server side error"
        })
    }
}

// login password validation controller
const loginPasswordValidation = async (req, res) => {
    try {
        const { password } = req.body
        const checkPassword = await User.findOne({ password: password })
        if (!password) {
            res.send({ error: "Password is required" })
        }
        else if (!checkPassword) {
            res.send({
                error: "This password is not correct"
            })
        } else {
            res.send({ success: "Validated" })
        }
    } catch (error) {
        res.send({
            message: "Server side error"
        })
    }
}

// name validation
const validateName = (req, res) => {
    const { name } = req.body
    if (!name) {
        res.send({ error: "Name is required" })
    }
    else if (name.length < 3) {
        res.send({ error: "At least 3 charecters required" })
    } else {
        res.send({ success: "Validated" })
    }
}


// email validation
const validateEmail = async (req, res) => {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const { email } = req.body
    const isEmail = await User.findOne({ email: email })
    if (!email) {
        res.send({ error: "Email is required" })
    }
    else if (!filter.test(email)) {
        res.send({ error: "Please enter a valid email" })
    }
    else if (isEmail) {
        res.send({ error: "Email is already registered." })
    }
    else {
        res.send({ success: "Validated" })
    }
}

// password validation
const validatePassword = async (req, res) => {
    const letter = /[a-z]/;
    const upper = /[A-Z]/;
    const number = /[0-9]/;
    const { password } = req.body;

    if (!password) {
        res.send({ error: "Password is required" })
    } else if (!letter.test(password)) {
        res.send({ error: "At least 1 lowercase" })
    } else if (!upper.test(password)) {
        res.send({ error: "At least 1 uppercase" })
    } else if (!number.test(password)) {
        res.send({ error: "At least 1 number" })
    } else if (password.length < 6) {
        res.send({ error: "At least 6 character" })
    } else {
        res.send({ success: "Validated" })
    }
}


module.exports = {
    registerController,
    loginController,
    loginEmailvalidation,
    loginPasswordValidation,
    validateName,
    validateEmail,
    validatePassword
}


