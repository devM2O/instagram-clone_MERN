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
    .sort({"_id": -1})
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
    .populate("comments.postedBy", "_id name")
    .sort({"_id": -1})
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

//---------------------------------------------------------------//
//Like && unlike
router.put('/like', requireLogin,async (req,res)=>{
   await Post.findByIdAndUpdate(req.body.postId, {
        $push:{likes: req.user._id}
    },{
        new: true
    })
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "id name")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error: err})
        }
        else{
            res.json(result)
        }
    })
})

router.put('/unlike', requireLogin,async (req,res)=>{
    await Post.findByIdAndUpdate(req.body.postId, {
        $pull:{likes: req.user._id}
    },{
        new: true
    })
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "id name")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error: err})
        }
        else{
            res.json(result)
        }
    })
})

//-----------------------------------------------------------//
//comment
router.put('/comment', requireLogin,async (req,res)=>{
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }

    await Post.findByIdAndUpdate(req.body.postId, {
         $push:{comments: comment}
     },{
         new: true
     })
     .populate("comments.postedBy", "_id name")
     .populate("postedBy", "id name")
     .exec((err, result)=>{
         if(err){
             return res.status(422).json({error: err})
         }
         else{
             res.json(result)
         }
     })
 })

 //----------------------------------------------------------------//
 //DELETE POST
 router.delete('/deletePost/:postId', requireLogin,async (req,res)=>{
    await Post.findOne({_id: req.params.postId})
    .populate("postedBy", "_id")
    .exec((err, post)=>{
        if(err || !post){
            return res.status(422).json({error: err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err);
            })
        }
    })
 })



module.exports = router