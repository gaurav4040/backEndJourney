const express = require('express');
const path = require('path');
const userRouter = require('./routes/userRouter')
const {hostRouter}= require('./routes/hostRouter')
const rootDir=require('./utils/pathUtil')

const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir,'public')));

app.use((req,res,next)=>{
    res.status(404).render('404Error',{pageTitle:'page not found'})
});

const PORT =3003;
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})