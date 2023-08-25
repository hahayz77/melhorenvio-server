require('dotenv').config()
const jwt = require('jsonwebtoken');
const getTokensDB = require('../functions/GetTokensDB');
const refreshToken = require('../functions/RefreshToken');


module.exports = async (req, res, next) => {
    try {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        let { access_token } = req.body; // if access_token was sended from the client
        if (!access_token) throw new Error("No token was provided!")  // If no one access_token was sended from the client

        const decoded = await jwt.decode(access_token); //decode token
        if (!decoded) throw new Error("Error on Decode Token! Something is wrong with this token.");


        if (currentTimestamp < decoded.exp) { // < to force refresh
            const tokensFromDB = await getTokensDB();
            if (!tokensFromDB) throw new Error("Internal server error! No token provided from storage.");

            const decodeTokenFromDB = await jwt.decode(tokensFromDB.access_token); //decode token from db
            if (!decodeTokenFromDB) throw new Error("Error on Decode Token! Something is wrong with this stored token.");

            if (currentTimestamp < decodeTokenFromDB.exp) {
                access_token = await refreshToken(tokensFromDB.refresh_token);
                if (!access_token) throw new Error("Internal Server Error! No Access Token from storage!");
            }
        }
        // All OK! No need to refresh tokens
        req.body.access_token = access_token; //send access_token back to the next route
        return next();
    } catch (err) {
        next(err);
    }
}