const Token = require("../database/models/Token");

const getTokensDB = async () => {
    try {
        const getTokens = await Token.findOne();
        return getTokens;

    } catch (err) {
        throw new Error({ message: err.message })
    }
}
module.exports = getTokensDB;