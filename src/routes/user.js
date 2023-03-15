const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth')


router.use(authMiddleware);

router.get('/', (req,res)=>{
        res.json({msg:'user page', user: req.userId})
})

module.exports = router;