const Token = require("../database/models/Token");

const getAccessToken = async () => {
    try {
        const getToken = await Token.findOne();
        const accessToken = await getToken.access_token;

        return accessToken;

    } catch (err) {
        throw new Error({ message: err.message })
    }
}
module.exports = getAccessToken;