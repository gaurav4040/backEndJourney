const express= require('express');
const path = require('path');
const hostRouter = express.Router();
const rootDir=require('../utils/pathUtil')

hostRouter.get("/add-home",(req,res,next)=>{
    console.log(req.url,req.method);
    res.render('addHome',{pageTitle:'add home to airbnb'})
}); 

const registeredHomes=[];

hostRouter.post("/add-home",(req,res,next)=>{
    console.log(req.body);
    registeredHomes.push({houseName:req.body.houseName})
    // res.send(`<h1> registered sucessfully</h1>`)
    res.render('homeAdded',{pageTitle:'home added successfully'})
}); 


exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;