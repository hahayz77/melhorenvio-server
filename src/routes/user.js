const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require('../middlewares/auth');


router.use(authMiddleware);

router.get('/', async(req,res)=>{
    try {
        const findUsers = await User.find();
        res.send(findUsers);
    } catch (err) {
        console.log(err)
    }
})

router.delete('/', async (req,res)=>{
    try {
        const deleteAll = await User.deleteMany({});
        res.json(deleteAll);
    } catch (error) {
        console.log(err)
    }
})

module.exports = router;