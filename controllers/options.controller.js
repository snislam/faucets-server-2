const Option = require("../models/options.model");


const optionGetController = async (_req, res) => {
    try {
        const option = await Option.find({})   
        res.status(200).send({
            message: "All data",
            data: option
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

const optionPostController = async (req, res) => {
    const newOption = new Option(req.body)
    await newOption.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a serverside error"
            })
        } else {
            res.status(200).json({
                message: "Inserted successfully"
            })
        }
    })
}

module.exports = {optionGetController, optionPostController};

