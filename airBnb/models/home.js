const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/pathUtil')

const homeDataPath = path.join(rootDir,'data','homes.json');


module.exports = class Home{
    constructor(houseName,price,location,rating,photoUrl){
        this.houseName=houseName;
        this.price=price;
        this.location=location;
        this.rating=rating;
        this.photoUrl=photoUrl;
    }

    save(){
        this.id=Math.random().toString();
        Home.fetchAll(registeredHomes=>{
            registeredHomes.push(this);
            fs.writeFile(homeDataPath,JSON.stringify(registeredHomes),error=>{
                console.log(`file writing concluded`,error);
            });
        });
    };

    static fetchAll(callback){
        fs.readFile(homeDataPath,(err,data)=>{
            if(!err){
                callback(JSON.parse(data));
            }
            else{
                console.log("error has occured",err);
                callback([]);
            }
        });
    }

    static findById(homeId,callback){
        this.fetchAll(homes=>{
            const homeFound = homes.find(home=>home.id===homeId);
            callback(homeFound);
        })
    }
};