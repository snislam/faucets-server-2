const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const router = require('./routes/index');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 7000;

// middleware
app.use(express.json());
app.use(cors());

// connecting mongoose
const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.7g5fvvn.mongodb.net/test`;
mongoose.connect(url)
    .then(res =>{
    
        app.use('/public', router)  
        

    }).catch(err => {
        console.log(err)
    })

// simple general route
app.get('/', (req, res) => {
    res.send({message: "I am your testing code response!"})
})

// port listening
app.listen(PORT, () => {
    console.log("Superb! I am running.");
})