require('dotenv').config()
const jwt = require('jsonwebtoken');
const getTokensDB = require('../functions/GetTokensDB');
const refreshToken = require('../functions/RefreshToken');


module.exports = async (req, res, next) => {
    try {
        let decoded;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        let { access_token } = req.body; // if access_token was sended from the client

        if (access_token) {
            decoded = await jwt.decode(access_token); //decode token from db
            if(!decoded) throw new Error("Error on Decode Token! Something is wrong with this stored token.");
        }
        

        // < expired || > not expired || Wrong token ?
        if (currentTimestamp > decoded?.exp || !access_token) {
            const tokensFromDB = await getTokensDB();
            if (!tokensFromDB) throw new Error("Internal server error! No token provided from storage.");
            access_token = tokensFromDB.access_token;

            const decodeTokenFromDB = await jwt.decode(access_token); //decode token from db
            if (!decodeTokenFromDB) throw new Error("Error on Decode Token! Something is wrong with this stored token.");


            if (currentTimestamp > decodeTokenFromDB.exp) { // < expired || > not expired                
                access_token = await refreshToken(tokensFromDB.refresh_token);
                if (!access_token) throw new Error("Internal Server Error! No Access Token from storage!");
            }
        }
        // All OK! No need to refresh tokens
        req.body.access_token = access_token; //send access_token back to the next route if its a new one taken from the server or DB
        return next();
    } catch (err) {
        next(err);
    }
}