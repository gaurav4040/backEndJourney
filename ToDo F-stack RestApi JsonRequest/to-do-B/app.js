const express = require("express");
const path = require("path");

const cors = require('cors');
const { default: mongoose } = require("mongoose");


const MONGO_DB_URL = "mongodb+srv://root:root@airbnb.ljguy0q.mongodb.net/todo?retryWrites=true&w=majority&appName=airbnb";


// const {mongoConnect} = require("./utils/dataBaseUtil");

 const errorsController = require('./controller/Error');
const todoItemsRouter = require("./routes/todoItemsRouter");

const app = express();



app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/todo",todoItemsRouter);

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

