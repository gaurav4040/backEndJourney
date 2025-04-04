const {getDB} =require('../utils/dataBaseUtil');
const { ObjectId } = require("mongodb");


module.exports = class Favorite{
    
    constructor(houseId) {
        this.houseId = houseId;
        
      }
     save(){
        const db = getDB();
        return db.collection("favorites").findOne({houseId:this.houseId}).then(existingFav=>{
            if(!existingFav){
                return db.collection("favorites").insertOne(this);
            }
            return Promise.resolve();
        })
        
    }
    static getFavorites(){
        const db = getDB();
        return db.collection("favorites").find().toArray();
    }
    static deleteById(delHomeId){
        const db = getDB();
    return db.collection("favorites").deleteOne({ houseId:delHomeId});
    }
};



//--------------------------------------------------------------------------------------
// //commenting previous code which used in file writing database(fake database eg.home.json) ,new code for real database(mongoDB)
//---------------commenting (file writing database) based code ,now implementing real database;


// const fs = require('fs')
// const path = require('path')
// const rootDir = require('../utils/pathUtil')

// const favoriteDataPath = path.join(rootDir,'data','favorites.json');


// module.exports = class Favorite{
    
//     static addToFavorite(homeId,callback){
//         Favorite.getFavorites((favorites)=>{
//             if(favorites.includes(homeId)){
//                 callback("already marked")
//             }
//             else{
//                 favorites.push(homeId);
//                 fs.writeFile(favoriteDataPath,JSON.stringify(favorites),callback);
//             }
//         });
//     }
//     static getFavorites(callback){
//         fs.readFile(favoriteDataPath,(err,data)=>{
//             if(!err){
//                 callback(JSON.parse(data));
//             }
//             else{
//                 callback([]);
//             }
//         });
//     }
//     static deleteById(delHomeId,callback){
//         Favorite.getFavorites(homeIds=>{
//             homeIds = homeIds.filter(homeId=>delHomeId!==homeId);
//             fs.writeFile(favoriteDataPath,JSON.stringify(homeIds),callback);    
//         })
//     }
// };