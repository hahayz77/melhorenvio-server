const jwt = require('jsonwebtoken');
require('dotenv').config()


module.exports = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader)
    return res.status(401).json({error: "No token Provided!"});

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
    return res.status(401).json({error: "token Error!"});

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
    return res.status(401).json({error: "Token not formated"});

    jwt.verify(token, process.env.SECRET, (err, decoded)=>{
        if(err)
        return res.status(401).json({error: "Invalid Token!"})

        req.userId = decoded.params.id;
        return next();
    })

}