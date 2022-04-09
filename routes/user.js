const router = require("express").Router();

router.get("/",(_req,res)=>{
    res.send("user route")
})


module.exports= router