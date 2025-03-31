const express= require('express');
const path = require('path');
const hostRouter = express.Router();
const rootDir=require('../utils/pathUtil')

hostRouter.get("/add-home",(req,res,next)=>{
    console.log(req.url,req.method);
    res.sendFile(path.join(rootDir,'views','addHome.html'))
}); 

hostRouter.post("/add-home",(req,res,next)=>{
    console.log(req.body);
    // res.send(`<h1> registered sucessfully</h1>`)
    res.sendFile(path.join(rootDir,'views','homeAdded.html'))
}); 


module.exports = hostRouter;