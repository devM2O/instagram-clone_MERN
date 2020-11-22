const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  pic:{
    type: String,
    default: "https://www.pinclipart.com/picdir/middle/157-1578186_user-profile-default-image-png-clipart.png"
  },
  followers:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
  following:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}]
})

module.exports = mongoose.model('User', userSchema)
