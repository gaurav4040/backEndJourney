
const express = require('express');

const app = express();

app.use((req,res,next)=>{
    console.log("dummy 1 middleware",req.url,req.method);
    next();
})
app.use((req,res,next)=>{
    console.log("dummy 2 middleware",req.url,req.method);
    next();
})
// app.use((req,res,next)=>{
//     console.log("dummy 3 middleware",req.url,req.method);
//     res.send("<h1>dummy third middleware response</h1>")
// })
app.get("/",(req,res,next)=>{
    console.log("dummy 4 middleware handling '/' ",req.url,req.method);
    res.send("<h1> hii </h1>");

})

app.get("/contact-us",(req,res,next)=>{
    console.log("dummy 5 middleware handling '/contact-us' for GET",req.url,req.method);
    res.send(`
        <h1> please give us your details</h1>
        <form action="/contact-us" method="POST">
            <input type="text" name="name" placeholder="Enter your name"/>
            <input type="email" name="email" placeholder="Enter your email"/>
            <input type="submit"/>
        </form>
        `)
})
app.post("/contact-us",(req,res,next)=>{
    console.log("dummy 6 middleware handling '/contact-us' for POST",req.url,req.method);
    res.send("<h1>thanks for the details , WE will contact you shortly</h1>");

})

const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`server is running on port${PORT}`);
})