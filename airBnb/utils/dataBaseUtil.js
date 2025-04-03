const mysql= require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"gauravjangra",
    database:"AirBnb",
});

module.exports=pool.promise();