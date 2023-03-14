const express = require("express");
const router = express.Router();
const User = require('../models/User')


router.get('/', async(req,res)=>{
    const userFind = await User.find({});

    console.log(userFind)

    res.json({response: "auth route"})
})


module.exports = router;