const mongoose = require('mongoose');   

const optionSchema = mongoose.Schema({
    option: {
        type: String,
        minLength: [3, 'At least three characters.'],
    },
    icon: String
})

const Option = new mongoose.model('Option', optionSchema);

module.exports = Option;