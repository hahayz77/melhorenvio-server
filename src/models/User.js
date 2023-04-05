const mongoose = require('../database/mongodb');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
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
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    }

})

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

module.exports = mongoose.model('User', UserSchema);