const express=require('express');
const authRouter=express.Router();
const userModel=require('../models/userModels');
const jwt=require('jsonwebtoken');
const JWT_KEY=require('../secrets');
const { signup,login } = require('../controller/authController');

authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(signup);

authRouter
.route('/login')
.post(login)


//middleware
function middleware1(req,res,next){
    console.log('middleware1 encountered');
    next();
}
function middleware2(req,res){
    console.log('middleware2 encountered');
    console.log('middleware 2 ended req/res cycle');
    res.sendFile('signup.html',{root:__dirname});
}
function getSignUp(req,res,next){
    console.log('getsignup called');
    next();
    // res.sendFile('signup.html',{root:__dirname});
}

module.exports=authRouter;

