const mongoose = require('../mongodb');

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
    expires_in: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true // Add timestamps option here
    }
)

module.exports = mongoose.model('Token', TokenSchema);