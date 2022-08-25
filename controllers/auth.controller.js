const User = require("../models/auth.model")

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

const validateName = async(req, res) =>{
    const { name } = req.body
    if (!name) {
        res.send({error:"Name is required"})
    }
    else if (name.length < 3 ) {
        res.send({error:"At least 3 charecters required"})
    } else{
        res.send({success:"Validated"})
    }
}


module.exports = {registerController, validateName}