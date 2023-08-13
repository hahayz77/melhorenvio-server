require('dotenv').config()
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const { access_token } = req.body;

    // verificar se o access_token é válido (se expirou ou não está vazio)
    // ATENÇÃO, VERIFICAR POSSIBILIDADE DE ENVIAREM FALSO ACCESS_TOKEN

    // caso não seja válido usar método refreshToken();
    // refreshToken() precisa: 
    //1 - usar refreshToken Válido, 
    //2 - enviar novo access_token pro usuario

    // caso seja válido next();
    return next();
}