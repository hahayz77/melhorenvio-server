require('dotenv').config();
const express = require("express");
const router = express.Router();
const Token = require('../models/Token');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get("/", async (req, res) => {
    try {
        const getToken = await Token.findOne();
        const accessToken = await getToken.access_token

        res.status(200).json({ accessToken })

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/calculate', async (req, res) => {
    try {
        // const { zipCode } = req.body;

        // if(!zipCode) return res.status(400).json({msg: "ZipCode not found!"})

        res.status(200).json({ zipCode: zipCode });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})

module.exports = router;