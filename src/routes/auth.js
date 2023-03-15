const express = require("express");
const router = express.Router();
const User = require('../models/User');


router.get('/', async(req,res)=>{
    try {
        const findUsers = await User.find();
        res.send(findUsers);
    } catch (err) {
        console.log(err)
    }
})

router.post('/register', async(req, res)=>{
    try {        
        const { email, password } = req.body;
        const findUser = await User.findOne({email: email});
        if(findUser) return res.status(400).json({msg: "user already exists"});

        const newUser = new User({ email: email, password: password }).save();
        (await newUser).password = undefined;
        res.status(200).json(await newUser);
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;