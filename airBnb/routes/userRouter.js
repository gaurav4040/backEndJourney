const express= require('express');
const path = require('path');
const rootDir=require('../utils/pathUtil')
const {registeredHomes} = require('./hostRouter');

const userRouter= express.Router();

userRouter.get("/",(req,res,next)=>{
    console.log(req.url,req.method);
    res.render('home',{
        registeredHomes:registeredHomes,pageTitle:'airbnb home',
        currentPage:'Home'
    });
});


module.exports = userRouter;