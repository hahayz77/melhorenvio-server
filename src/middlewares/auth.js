require('dotenv').config()
const jwt = require('jsonwebtoken');
const getTokensDB = require('../functions/GetTokensDB');
const refreshToken = require('../functions/RefreshToken');


module.exports = async (req, res, next) => {
    try {
        let tokensFromDB;
        let { access_token } = req.body; // if access_token was sended from the client
        
        if (!access_token) { // If no one access_token was sended from the client
            tokensFromDB = await getTokensDB();
            access_token = tokensFromDB.access_token;
        }  

        const decoded = await jwt.decode(access_token); //decode token
        const currentTimestamp = Math.floor(Date.now() / 1000);

        //RefreshTokens
        if (currentTimestamp > decoded.exp) { // < to force refresh token
            if(tokensFromDB) access_token = await refreshToken(tokensFromDB.refresh_token); // If already got tokens from DB
            else{ // if have no token from DB
                tokensFromDB = await getTokensDB();
                access_token = await refreshToken(tokensFromDB.refresh_token)
            }
        }

        // All OK! No need to refresh tokens
        req.body = {access_token}; //send access_token back to the next route
        return next();
    } catch (err) {
        next(err);
    }
}