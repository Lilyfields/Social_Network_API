const router =require("express").Router();
const res = require("express/lib/response");
const Post = require("../models/Post");
const user = require("../Models/user");

// testing route
// router.get("/",(req,res) =>{
//     console.log("post page")
// })

//create a post

router.post("/", async (req, res) =>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    }catch(err){
     res.status(500).json(err)
    }
});
// test route on postman and check data on MongoDB Atlas/compass

//update a post

router.put("/:id",async(req,res) =>{
    try{
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
        await post.updateOne({$set:req.body});
        res.status(200).json("The post has been updated");
    } else {
        res.status(403).json("You can only update your post");
    }
} catch(err) {
    res.status(500).json(err);
}

});
// test route on postman and check data on MongoDB Atlas/compass

//delete a post

router.delete("/:id",async(req,res) =>{
    try{
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("The post has been deleted");
    } else {
        res.status(403).json("You can only delete your post");
    }
} catch(err) {
    res.status(500).json(err);
}

});

//test route on postman and check data on MongoDB Atlas/compass

//like/dislike a post

router.put("/:id/like", async (req, res)=> {
    try {
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push: {likes: req.body.userId}});
        res.status(200).json("This post has a like");
    }else{
        await post.updateOne ({$pull: {likes: req.body.userId}});
        res.status(200).json(" Dislike this post");
    }
    }catch (err) {
        res.status(500).json(err);
    }
});

//test route on postman and check data on MongoDB Atlas/compass

//get a post
router.put("/:id", async (req, res)=> {
    try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
    
    }catch (err) {
        res.status(500).json(err);
    }
});
//test route on postman and check data on MongoDB Atlas/compass

//get timeline posts

router.get("/timeline/all",async (req, res) =>{
    try{
        const currentUser =await user.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) =>{
                Post.find({ userId: friendId});

            })  
        );
        res.json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err);
    }

});
//test route on postman and check data on MongoDB Atlas/compass


module.exports =router;