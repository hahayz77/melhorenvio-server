require('dotenv').config();
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const shipmentCalculate = require('../functions/shipment/Calculate');

router.use(authMiddleware);

router.get("/", async (req, res) => {
    try {
        const { access_token } = req.body;

        res.status(200).json({ access_token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/calculate', async (req, res) => {
    try {
        const { access_token, zip_code } = req.body;
        const data = await shipmentCalculate(access_token, zip_code);

        // if(!zipCode) return res.status(400).json({msg: "ZipCode not found!"})

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})

module.exports = router;