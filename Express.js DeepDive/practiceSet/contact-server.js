
const express = require('express');

const rootDir = require('./utils/pathUtil')

const homeRouter = require('./routes/homeRoute');
const contactRouter = require('./routes/contactRoute');


const app = express();

app.use(express.urlencoded());
app.use(homeRouter);
app.use(contactRouter);

app.get((req,res,next)=>{
    res.status(404).sendFile(rootDir,'views','404Page.html');
})


const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`server is running on port${PORT}`);
})