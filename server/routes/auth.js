const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("User");

router.get("/protected", requireLogin, (req, res) => {
  res.send("hello user");
});

//------------------------------------------------------//
//Signup
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({ error: "All fields are required" });
  }
  User.findOne({ email: email })
    .then((findUser) => {
      if (!findUser) {
        const hashedpassword = bcrypt.hashSync(password, 12);
        const user = new User({
          name: name,
          email: email,
          password: hashedpassword,
        });
        user.save();
        return res.status(200).json({ message: "You are now registered" });
      }
      return res.status(422).json({ error: "already exists" });
    })
    .catch((e) => {
      console.log(e);
    });
});

//------------------------------------------------------//

//Login handle
router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please fill all fields" });
  }
  //Match user
  User.findOne({
    email: email,
  })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "invalid email" });
      }
      //Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          // res.status(200).json({message: 'success'})
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
          const {id, name, email, followers, following} = user
          res.json({ token, user:{id, name, email, followers, following}});
        } else {
          res.status(422).json({ error: "incorrect password" });
        }
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
