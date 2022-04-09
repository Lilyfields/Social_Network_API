const router = require("express").Router();
const User = require("../Models/user");


//Register
router.get("/register",async(_req,_res)=>{
    const user = await new User({
        username:"Jane",
        email:"jane@testmail.com",
        password:"123456"
    })

    await user.save();
    res.send("okay")

});
    



module.exports= router