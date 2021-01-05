const express=require('express');
const env=require('dotenv');
const app=express();
const bodyParser=require('body-parser');
const Mongoose = require('mongoose');


const userRoutes=require('./routes/user');
env.config();

Mongoose.connect('mongodb://localhost:27017/flipkart',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},()=>{
    console.log('database connected');
})
app.use(express.json())

app.use(userRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`server running on ${process.env.PORT}`);
})