const express = require("express");
const path = require("path");
const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const authRouter = require('./routes/authRouter');

const multer = require('multer')

const { default: mongoose } = require("mongoose");

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGO_DB_URL = "mongodb+srv://root:root@airbnb.ljguy0q.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb";

const rootDir = require("./utils/pathUtil");
const errorsController = require("./controller/Error");
// const {mongoConnect} = require("./utils/dataBaseUtil");

 

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri:MONGO_DB_URL,
  collection:'sessions'
})

const randomString = (length)=>{
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for(let i=0;i<length;i++){
    result+=characters.charAt(Math.floor(Math.random()*characters.length))
  }
  return result;
}

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/");
  },
  filename:(req,file,cb)=>{
    cb(null,randomString(10)+'-'+file.originalname);
  }
});

const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const multerOption ={
    storage,fileFilter
}

app.use(express.urlencoded());
app.use(multer(multerOption).single('photo'));
app.use(express.static(path.join(rootDir, "public")));
app.use("uploads/",express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads/",express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads/",express.static(path.join(rootDir, "uploads")));


app.use(session({
  secret:'learning airbnb',
  resave:false,
  saveUninitialized:true,
  store:store
}))

app.use((req,res,next)=>{
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host",(req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }
  else{
    res.redirect("/login");
  }
})
app.use("/host", hostRouter);


app.use(errorsController.notFoundPage);


const PORT = 3003;



mongoose.connect(MONGO_DB_URL).then(()=>{
  app.listen(PORT, () => {
    console.log(`server started on port : ${PORT}`);
  });
}).catch(err=>{
  console.log('error while connecting through mongoose : ',err);
})




// mongoConnect(()=>{

  // app.listen(PORT, () => {
  //   console.log(`server started on port ${PORT}`);
  // });
//});

