require('dotenv').config()
const jwt = require('jsonwebtoken');


module.exports = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    // if(!authHeader)
    // return res.status(401).json({error: "No token Provided!"});

    // const token = authHeader.split(' ')[1];

    // if(token === null) return res.status(401).json({error: "Invalid Token!"});

    // jwt.verify(token, process.env.SECRET, (err, decoded)=>{
    //     if(err)
    //     return res.status(401).json({error: "Invalid Token!"})

    //     req.userId = decoded.params.id;
        return next();
    // })

}