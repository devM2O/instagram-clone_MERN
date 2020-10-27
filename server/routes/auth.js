const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');

const User = mongoose.model("User")

router.get('/', (req, res)=>{
  res.send('hi')
})

router.post('/signup', async (req,res)=>{
  let findUser
  const {name, email, password} = req.body
  if(!email || !name || !password){
    return res.status(422).json({error: 'All fields are required'})
  }
  const user = new User({
    name: name,
    email: email,
    password: password
  })
  try {
    findUser = await User.findOne({email: email})
    if(findUser == null){
      await user.save()
      return res.status(200).json({message: 'success'})
    }
    return res.status(422).json({error: 'already exists'})
  } catch (e){
    console.log(e);
    res.redirect('/')
  }
})


module.exports = router
