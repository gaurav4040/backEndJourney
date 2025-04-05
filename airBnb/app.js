const express = require("express");
const path = require("path");
const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controller/Error");
const {mongoConnect} = require("./utils/dataBaseUtil");
const { default: mongoose } = require("mongoose");

 

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.notFoundPage);


const PORT = 3003;
const MONGO_URL = "mongodb+srv://root:root@airbnb.ljguy0q.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb";

mongoose.connect(MONGO_URL).then(()=>{
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

