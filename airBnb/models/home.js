//commenting previous code which used in file writing database(fake database eg.home.json) ,new code for real database(sql,mongoDB)

const db = require("../utils/dataBaseUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) {
      //update case
      return db.execute(
        `UPDATE homes SET houseName=?, price=?, location=?, rating=?, photoUrl=?,description=? WHERE id=?`,
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
          this.id,
        ]
      );
    } else {
      //insert case
      return db.execute(
        `INSERT INTO homes (houseName, price, location, rating, photoUrl,description) VALUES (?,?,?,?,?,?)`,
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
        ]
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id=?", [homeId]);
  }
  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
  }
};

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
//           if (home.id === this.id) {
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
//       const homeFound = homes.find((home) => home.id === homeId);
//       callback(homeFound);
//     });
//   }
//   static deleteById(homeId, callback) {
//     this.fetchAll((homes) => {
//       homes = homes.filter((home) => home.id !== homeId);
//       fs.writeFile(homeDataPath, JSON.stringify(homes), (error) => {
//         Favorite.deleteById(homeId, callback);
//       });
//     });
//   }
// };
