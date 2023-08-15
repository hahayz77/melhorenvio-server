require('dotenv').config()
const jwt = require('jsonwebtoken');
const getAccessToken = require('../functions/GetAccessToken');


module.exports = async (req, res, next) => {
    const { access_token } = req.body;

    if(!access_token) req.body.access_token = await getAccessToken();


    // verificar se o access_token é válido (se expirou ou não está vazio)
    // ATENÇÃO, VERIFICAR POSSIBILIDADE DE ENVIAREM FALSO ACCESS_TOKEN

    // caso não seja válido usar método refreshToken();
    // refreshToken() precisa: 
    //1 - usar refreshToken Válido, 
    //2 - enviar novo access_token pro usuario

    // caso seja válido next();
    return next();
}