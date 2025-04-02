const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/pathUtil')

const favoriteDataPath = path.join(rootDir,'data','favorites.json');


module.exports = class Favorite{
    
    static addToFavorite(homeId,callback){
        Favorite.getFavorites((favorites)=>{
            if(favorites.includes(homeId)){
                callback("already marked")
            }
            else{
                favorites.push(homeId);
                fs.writeFile(favoriteDataPath,JSON.stringify(favorites),callback);
            }
        });
    }
    static getFavorites(callback){
        fs.readFile(favoriteDataPath,(err,data)=>{
            if(!err){
                callback(JSON.parse(data));
            }
            else{
                callback([]);
            }
        });
    }
};