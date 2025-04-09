const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  photoUrl: String,
  description: String,
});

// homeSchema.pre('findOneAndDelete',async function(next){
//   const homeId = this.getQuery()._id;
//   await favorite.deleteMany({houseId:homeId});
//   next();
// })

module.exports = mongoose.model("Home", homeSchema);

//--------------------------- code while using mongoDB-------------------------------

// const { ObjectId } = require("mongodb");
// const { getDB } = require("../utils/dataBaseUtil");

// module.exports = class Home {
//   constructor(houseName, price, location, rating, photoUrl, description, id) {
//     this.houseName = houseName;
//     this.price = price;
//     this.location = location;
//     this.rating = rating;
//     this.photoUrl = photoUrl;
//     this.description = description;
//     // this.id=id;
//     if (_id) {
//       this._id = _id;
//     }
//   }

//   save() {
//     const db = getDB();
//     const updatedFields={
//             houseName : this.houseName,
//             price : this.price,
//             location : this.location,
//             rating : this.rating,
//             photoUrl : this.photoUrl,
//             description : this.description
//           }
//     if(this._id){//update
//       return db.collection("homes").updateOne({ _id:new ObjectId(String(this._id))},{$set:updatedFields});
//     }else{// insert
//       return db.collection("homes").insertOne(this);
//     }
//   }

//   static fetchAll() {
//     const db = getDB();
//     return db.collection("homes").find().toArray();
//   }

//   static findById(homeId) {
//     const db = getDB();
//     return db.collection("homes").find({ _id:new ObjectId(String(homeId))}).next();
//   }
//   static deleteById(homeId) {
//     const db = getDB();
//     return db.collection("homes").deleteOne({ _id:new ObjectId(String(homeId))});
//   }
// };

/// -----------------------------commenting SQL Database now using mongo
//

// const db = require("../utils/dataBaseUtil");

// module.exports = class Home {
//   constructor(houseName, price, location, rating, photoUrl, description, id) {
//     this.houseName = houseName;
//     this.price = price;
//     this.location = location;
//     this.rating = rating;
//     this.photoUrl = photoUrl;
//     this.description = description;
//     this.id = id;
//   }

//   save() {
//     if (this.id) {
//       //update case
//       return db.execute(
//         `UPDATE homes SET houseName=?, price=?, location=?, rating=?, photoUrl=?,description=? WHERE id=?`,
//         [
//           this.houseName,
//           this.price,
//           this.location,
//           this.rating,
//           this.photoUrl,
//           this.description,
//           this.id,
//         ]
//       );
//     } else {
//       //insert case
//       return db.execute(
//         `INSERT INTO homes (houseName, price, location, rating, photoUrl,description) VALUES (?,?,?,?,?,?)`,
//         [
//           this.houseName,
//           this.price,
//           this.location,
//           this.rating,
//           this.photoUrl,
//           this.description,
//         ]
//       );
//     }
//   }

//   static fetchAll() {
//     return db.execute("SELECT * FROM homes");
//   }

//   static findById(homeId) {
//     return db.execute("SELECT * FROM homes WHERE id=?", [homeId]);
//   }
//   static deleteById(homeId) {
//     return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
//   }
// };

//--------------------------------------------------------------------------------------

//commenting previous code which used in file writing database(fake database eg.home.json) ,new code for real database(sql,mongoDB)
//---------------commenting (file writing database) based code ,now implementing real database;

// const fs = require("fs");
// const path = require("path");
// const rootDir = require("../utils/pathUtil");
// const Favorite = require("./favorite");

// const homeDataPath = path.join(rootDir, "data", "homes.json");

// module.exports = class Home {
//   constructor(houseName, price, location, rating, photoUrl) {
//     this.houseName = houseName;
//     this.price = price;
//     this.location = location;
//     this.rating = rating;
//     this.photoUrl = photoUrl;
//   }

//   save() {
//     Home.fetchAll((registeredHomes) => {
//       if (this.id) {
//         registeredHomes = registeredHomes.map((home) => {
//           if (home._id === this.id) {
//             return this;
//           }
//           return home;
//         });
//       } else {
//         this.id = Math.random().toString();
//         registeredHomes.push(this);
//       }
//       fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
//         console.log(`file writing concluded`, error);
//       });
//     });
//   }

//   static fetchAll(callback) {
//     fs.readFile(homeDataPath, (err, data) => {
//       if (!err) {
//         callback(JSON.parse(data));
//       } else {
//         console.log("error has occured", err);
//         callback([]);
//       }
//     });
//   }

//   static findById(homeId, callback) {
//     this.fetchAll((homes) => {
//       const homeFound = homes.find((home) => home._id === homeId);
//       callback(homeFound);
//     });
//   }
//   static deleteById(homeId, callback) {
//     this.fetchAll((homes) => {
//       homes = homes.filter((home) => home._id !== homeId);
//       fs.writeFile(homeDataPath, JSON.stringify(homes), (error) => {
//         Favorite.deleteById(homeId, callback);
//       });
//     });
//   }
// };
