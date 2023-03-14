const mongoose = require('../database/mongodb');

const UserScheema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }

})

const User = mongoose.model("User", UserScheema);
module.exports = User;