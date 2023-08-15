require('dotenv').config()
const jwt = require('jsonwebtoken');
const getAccessTokenOnDB = require('../functions/GetAccessTokenOnDB');


module.exports = async (req, res, next) => {
    const { access_token } = req.body;

    // Se não for enviado nenhum token
    if(!access_token) req.body.access_token = await getAccessTokenOnDB();


    // verificar se o access_token é válido (se expirou ou não está vazio)
    // ATENÇÃO, VERIFICAR POSSIBILIDADE DE ENVIAREM FALSO ACCESS_TOKEN

    // caso não seja válido usar método refreshToken();
    // refreshToken() precisa: 
    //1 - usar refreshToken Válido, 
    //2 - enviar novo access_token pro usuario

    // caso seja válido next();
    return next();
}