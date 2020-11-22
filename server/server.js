
const express = require('express');
const app = express()
app.use(express.json())
const bodyParser = require('body-parser')
const {DATABASE_URL} = require('./config/keys')
//Mongoose
const mongoose = require('mongoose');
//connect to MongoDB
mongoose.connect(DATABASE_URL, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=> console.log("MongoDB connected"))
.catch(err=> console.log(err));

//require models
require('./models/user')
require('./models/post')


//routes
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/post'))
app.use('/', require('./routes/user'))

if(process.env.NODE_ENV == "production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 6000;

app.listen(port, function() {
  console.log(`Server has started successfully`);
});
