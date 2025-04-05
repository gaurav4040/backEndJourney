//----------------------------no use of this mongoDB code , while using mongoose
//--------------- this file is of ❌NO USE❌can be deleted if using mongose❌  

// const mongo = require('mongodb');

// const MongoClient=mongo.MongoClient;

// const MONGO_URL = "mongodb+srv://root:root@airbnb.ljguy0q.mongodb.net/?retryWrites=true&w=majority&appName=airbnb";

// let _db;

// const mongoConnect=(callback)=>{

//     MongoClient.connect(MONGO_URL).then(client=>{
//         _db = client.db('airbnb');
//         callback();
//     }).catch(error=>{
//         console.log(`error while connecting to mongo`,error);
//     });
// }

// const getDB=()=>{
//     if(!_db){
//         throw new Error('mongo not connected');
//     }
//     return _db;
// }

// exports.getDB=getDB;
// exports.mongoConnect=mongoConnect;

/// -----------------------------commenting SQL Database now using mongo

// const mysql= require('mysql2');

// const pool = mysql.createPool({
//     host:"localhost",
//     user:"root",
//     password:"gauravjangra",
//     database:"AirBnb",
// });

// module.exports=pool.promise();