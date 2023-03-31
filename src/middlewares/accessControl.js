require('dotenv').config()
const jwt = require('jsonwebtoken');


module.exports = (req,res,next)=>{
    console.log(req.body)
    
    return next();
}