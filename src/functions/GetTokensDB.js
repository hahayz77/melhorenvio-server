const Token = require("../database/models/Token");

const getTokensDB = async () => {
    try {
        const getTokens = await Token.findOne();
        if(!getTokens) throw new Error("error token db find")
        return getTokens;

    } catch (err) {
        throw new Error({ message: err.message })
    }
}
module.exports = getTokensDB;