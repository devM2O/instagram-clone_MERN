const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")

//---------------------------------------------------------------//
//myPost route
router.get('/myPosts',requireLogin, async (req,res)=>{
    let query = Post.find({postedBy:req.user.id})
    .populate("postedBy", "id name")
    try {
        const myPosts = await query.exec()
        res.json({myPosts})
    } catch (error) {
        console.log(error);
    }
})

//---------------------------------------------------------------//
//get post
router.get('/allPosts',requireLogin,async (req,res)=>{
    let query = Post.find()
    .populate("postedBy", "id name")
    try {
        const posts = await query.exec()
        res.json({posts})
    } catch (err) {
        console.log(err);
    }
})

//---------------------------------------------------------------//
//post posts
router.post('/createPost',requireLogin, (req,res)=>{
    const {title, body, pic} = req.body
    if(!title || !body || !pic){
        res.status(422).json({error: "all fields are required"})
    }
    // console.log(req.user)
    // res.send('ok')
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy: req.user
    })
    post.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router