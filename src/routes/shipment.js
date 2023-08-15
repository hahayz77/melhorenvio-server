require('dotenv').config();
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get("/", async (req, res) => {
    try {
        const { access_token } = req.body;
        // console.log(req.body)

        


        res.status(200).json({ access_token });
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