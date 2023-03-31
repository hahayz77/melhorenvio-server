const mongoose = require('../database/mongodb');
const bcrypt = require('bcryptjs');

const UserScheema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    roles: {
        type: Array,
        default: ['394aec1b342f1742']
    }

})

UserScheema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const User = mongoose.model("User", UserScheema);
module.exports = User;