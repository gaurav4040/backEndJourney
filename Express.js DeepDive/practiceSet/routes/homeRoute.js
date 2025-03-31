const express = require('express');
const path = require('path');
const homeRouter=express.Router();
const rootDir = require('../utils/pathUtil')

homeRouter.get("/",(req,res,next)=>{
    // console.log("dummy 4 middleware handling '/' ",req.url,req.method);
    res.sendFile(path.join(rootDir,'views','home.html'));

})

module.exports = homeRouter;