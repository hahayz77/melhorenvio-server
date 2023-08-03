const mongoose = require('../database/mongodb');

const TokenSchema = new mongoose.Schema({
    access_token: {
        type: String,
        required: true,
        unique: true
    },
    refresh_token: {
        type: String,
        required: true,
        unique: true
    },

})

module.exports = mongoose.model('Token', TokenSchema);