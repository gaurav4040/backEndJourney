//core module
// const http = require('http');
//external module
const express = require('express');
//local module
const requestHandler=require('./user');

const app= express();

app.use("/",(req,res,next)=>{
    console.log("came in first middleware",req.url,req.method);
    next();
});
app.use("/submit-details",(req,res,next)=>{
    console.log("came in second middleware",req.url,req.method);
    res.status(404).render('404Error',
        {
            pageTitle:'page not found',
            currentPage:'home'
        }
    )
});
    
const PORT = 3000;
 app.listen(PORT,()=>{
     console.log(`server is running on http:://localhost:${PORT}`)
 }); 

// const server=http.createServer(app);
// const PORT = 3000;
//  server.listen(PORT,()=>{
//      console.log(`server is running on http:://localhost:${PORT}`)
//  }); 