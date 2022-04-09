const router = require("express").Router();

router.get("/",(_req,res)=>{
    res.send("user auth")
})


module.exports= router