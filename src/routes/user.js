const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require('../middlewares/auth');
const accessMiddleware = require('../middlewares/accessControl');


router.use(authMiddleware);
router.use(accessMiddleware);

router.get('/', async(req,res)=>{
    try {
        const accessControl =  req.body
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