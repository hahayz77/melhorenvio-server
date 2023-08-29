require('dotenv').config();
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authenticate');
const shipmentCalculate = require('../functions/shipment/Calculate');
const getTokensDB = require('../functions/GetTokensDB');

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
        const { access_token, zip_code, package } = req.body;
        const data = await shipmentCalculate(access_token, zip_code, package);

        if (data.error === "Unauthorized" || data.error === "Internal Server Error") {
            const tokensFromDB = await getTokensDB();
            if (!tokensFromDB) throw new Error("Internal server error! No token provided from storage.");
            const newAccessToken = tokensFromDB.access_token;

            const dataSecondTry = await shipmentCalculate(newAccessToken, zip_code, package);
            if (!dataSecondTry) throw new Error("Internal server error! Error on second shipment calculation.");
            res.status(200).json({ data: dataSecondTry, access_token: newAccessToken })

        } else {
            res.status(200).json(data);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})

module.exports = router;