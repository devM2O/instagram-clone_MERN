if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express');
const app = express()
app.use(express.json())
const bodyParser = require('body-parser')

//Mongoose
const mongoose = require('mongoose');
//connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=> console.log("MongoDB connected"))
.catch(err=> console.log(err));

//require models
require('./models/user')

//routes
app.use('/', require('./routes/auth'));

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Server has started successfully`);
});
