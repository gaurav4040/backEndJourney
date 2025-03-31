const express = require('express');
const path = require('path');

const contactRouter=express.Router();
const rootDir = require('../utils/pathUtil')

contactRouter.get("/contact-us",(req,res,next)=>{
    // console.log("dummy 5 middleware handling '/contact-us' for GET",req.url,req.method);
    res.sendFile(path.join(rootDir,'views','contact.html'))
})


contactRouter.post("/contact-us",(req,res,next)=>{
    console.log(req.body);
    res.sendFile(path.join(rootDir,'views','contactAdded.html'));

});


module.exports= contactRouter;