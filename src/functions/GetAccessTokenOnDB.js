const Token = require("../database/models/Token");

const getAccessTokenOnDB = async () => {
    try {
        const getToken = await Token.findOne();
        return getToken.access_token;

    } catch (err) {
        throw new Error({ message: err.message })
    }
}
module.exports = getAccessTokenOnDB;