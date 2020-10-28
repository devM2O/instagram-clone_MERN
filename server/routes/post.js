const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")


router.post('/createPost',requireLogin, (req,res)=>{
    const {title, body} = req.body
    if(!title || !body){
        res.status(422).json({error: "all fields are required"})
    }
    // console.log(req.user)
    // res.send('ok')
    const post = new Post({
        title,
        body,
        postedBy: req.user.id
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