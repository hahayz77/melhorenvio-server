const Token = require("../database/models/Token");

const refreshToken = async (oldRefreshToken) => {
    try {
        const response = await fetch("https://sandbox.melhorenvio.com.br/oauth/token/", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "User-Agent": "ReadMe-API-Explorer"
            },
            body: JSON.stringify({
                grant_type: "refresh_token",
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                refresh_token: oldRefreshToken
            })
        })

        if (!response.ok) throw new Error;

        const data = await response.json();
        const newToken = await Token.updateOne({_id: "64cce7740be8803d2e6d3863"}, data);
        if(!newToken) throw new Error;

        return data.access_token;
    } catch (err) {
        throw new Error('RefreshToken Request failed');
    }
}

module.exports = refreshToken;