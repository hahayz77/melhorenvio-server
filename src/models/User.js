const mongoose = require('../database/mongodb');

const UserScheema = new mongoose.Schema({
    email: {
        type: String,
        // required: true,
        lowercase: true,
        // unique: true
    },
    password: {
        type: String,
        // required: true
    }

})

const User = mongoose.model("User", UserScheema);
module.exports = User;