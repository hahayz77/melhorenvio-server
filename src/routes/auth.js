require('dotenv').config();
const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(params = {}){
    return jwt.sign({ params }, process.env.SECRET, {
        expiresIn: '600s',
    })
    
}

router.post('/register', async(req, res)=>{
    try {        
        const { email, password } = req.body;
        const findUser = await User.findOne({email: email});
        if(findUser) return res.status(400).json({msg: "user already exists"});

        const newUser = new User({ email: email, password: password });
        const savedUser = await newUser.save();
        savedUser.password = undefined;
        res.status(200).json({savedUser, token: generateToken({id: savedUser.id})});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.SECRET);
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// router.post('/authenticate', async (req, res)=>{
//     try {
//         const {email, password} = req.body;
//         const findUser = await User.findOne({email: email }).select('+password')

//         if(!findUser) 
//         return res.status(400).json({msg: "user not found!"})

//         if(!await bcrypt.compare(password, findUser.password)) 
//         return res.status(400).json({msg: "invalid password!"})

        
//         findUser.password = undefined;
//         res.status(200).json({findUser, token: generateToken({id: findUser.id})});
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }

// })

module.exports = router;