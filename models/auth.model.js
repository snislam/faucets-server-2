const mongoose = require('mongoose');   

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        minLength: [3, 'At least three characters.']
    },
    email: String,
    password: String
})

const User = new mongoose.model('User', userSchema);

module.exports = User;