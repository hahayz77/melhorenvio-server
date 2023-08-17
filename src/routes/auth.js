require('dotenv').config();
const express = require("express");
const Token = require('../database/models/Token');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const getAccessTokenFromDB = await Token.findOne();
        if (!getAccessTokenFromDB) throw new Error;

        res.status(200).json({access_token: getAccessTokenFromDB.access_token})
    } catch (err) {
        res.status(500).json({message: err.message || err})
    }
})

module.exports = router;