const express = require('express');
const path = require('path');
const userRouter = require('./routes/userRouter')
const hostRouter= require('./routes/hostRouter')
const rootDir=require('./utils/pathUtil')

const app = express();

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host",hostRouter);


app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'views','404Error.html'))
})

const PORT =3003;
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})