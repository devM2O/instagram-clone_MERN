const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model("User")
const {JWT_SECRET} = require('../../config/keys')

module.exports = (req,res,next) =>{
  const {authorization} = req.headers
  //authorization === minmawoo srgh3je4i4(token)
  if(!authorization){
    return res.status(401).json({error: "you must be logged in"})
  }
  const token = authorization.replace("minnmawoo ", "")
  jwt.verify(token, JWT_SECRET,(err,payload)=>{
    if(err){
      return res.status(401).json({error: "you must be logged in"})
    }
    const {_id} = payload
    User.findById(_id)
    .then(userData=>{
      req.user = userData
      next()
    })
  })
}
