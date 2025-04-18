
const Home = require("../models/home");
const {ObjectId} = require('mongoose');
const User = require("../models/user");

exports.getIndex = (req, res, next) => {

  Home.find().then(registeredHomes=>{
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb home",
      currentPage: "index",
      isLoggedIn:req.isLoggedIn,
      userName:req.session.userName,
      Email:req.session.Email
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then(registeredHomes=>{
    res.render("store/homeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Home List",
      currentPage: "Home",
      isLoggedIn:req.isLoggedIn,
      userName:req.session.userName,
      Email:req.session.Email
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "my bookings",
    currentPage: "bookings",
    isLoggedIn:req.isLoggedIn,
    userName:req.session.userName,
    Email:req.session.Email
  });
};

exports.getFavoriteList=async (req, res, next) => {
  const userId = req.session.userName ? req.session.userName._id : req.session.Email._id;

  const user = await User.findById(userId).populate('favorites')
 
      res.render("store/favoriteList", {
        favoriteHomes: user.favorites,
        pageTitle: "my favorites",
        currentPage: "favorites",
        isLoggedIn:req.isLoggedIn,
        userName:req.session.userName,
        Email:req.session.Email
      }); 

  // Favorite.find().populate('houseId').then(favorites=>{
  //   const favoriteHomes = favorites.map(fav=>fav.houseId)
 
  //     res.render("store/favoriteList", {
  //       favoriteHomes: favoriteHomes,
  //       pageTitle: "my favorites",
  //       currentPage: "favorites",
  //       isLoggedIn:req.isLoggedIn,
  //       userName:req.session.userName,
  //       Email:req.session.Email
  //     });
  //   });
};

exports.postAddToFavorite =async (req, res, next) => {
  const homeId=req.body.id;
  const userId = req.session.userName ? req.session.userName._id : req.session.Email._id;

  const user = await User.findById(userId).populate('favorites');

  if(!user.favorites.includes(homeId)){
    user.favorites.push(homeId);
    await user.save();
  }

  res.redirect("/favorites"); 

  // Favorite.findOne({houseId:homeId}).then((fav)=>{
  //   if(fav){
  //     console.log('already Marked');
  //     return res.redirect('/favorites');
  //   }
  //   else{
  //     fav=new Favorite({houseId:homeId})
  //     fav.save().then(result=>{
  //       console.log('added successfully : ',result);
  //       res.redirect('/favorites');
  //     })
  //   }
  // }).catch(error=>{
  //   console.log('error while adding to fav : ',error);
  // })

};

exports.postRemoveFavorite =async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.userName ? req.session.userName._id : req.session.Email._id;

  const user = await User.findById(userId).populate('favorites');

  if(user.favorites.includes(homeId)){
    user.favorites = user.favorites.filter(fav=>fav!==homeId);
    await user.save();
  }
  
  res.redirect('/favorites');

  // Favorite.findOneAndDelete({houseId:homeId}).then(result=>{
  //   console.log('favorite removed : ',result);
  // }).catch(error=>{
  //   console.log('error while removing fav : ',error);
  // }).finally(()=>{
  //   res.redirect('/favorites');
  // });
 
};


exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("home not found");
      res.redirect("/homes");
    } else {
      res.render("store/homeDetails", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "Home",
        isLoggedIn:req.isLoggedIn,
        userName:req.session.userName,
        Email:req.session.Email
      });
    }
  });
};


//commenting previous code which used in file writing database(fake database eg.home.json) ,new code for real database(sql,mongoDB)
// ----- code for-----SQL and mongoDB is same(destructing not required)  ---diff for fileBased database
//---- now commenting  code for SQL
//---- now commenting  code for mongoDB


// const Favorite = require("../models/favorite");
// const Home = require("../models/home");


// exports.getIndex = (req, res, next) => {

//   Home.fetchAll().then(registeredHomes=>{
//     res.render("store/index", {
//       registeredHomes: registeredHomes,
//       pageTitle: "airbnb home",
//       currentPage: "index",
//     });
//   });
// };

// exports.getIndex = (req, res, next) => {

//   Home.fetchAll().then(([registeredHomes,fields])=>{
//     res.render("store/index", {
//       registeredHomes: registeredHomes,
//       pageTitle: "airbnb home",
//       currentPage: "index",
//     });
//   });
// };

// exports.getIndex = (req, res, next) => {
//   Home.fetchAll((registeredHomes) => {
//     res.render("store/index", {
//       registeredHomes: registeredHomes,
//       pageTitle: "airbnb home",
//       currentPage: "index",
//     });
//   });
// };

// exports.getHomes = (req, res, next) => {
//   Home.fetchAll().then(registeredHomes=>{
//     res.render("store/homeList", {
//       registeredHomes: registeredHomes,
//       pageTitle: "Home List",
//       currentPage: "Home",
//     });
//   });
// };

// exports.getHomes = (req, res, next) => {
//   Home.fetchAll().then(([registeredHomes,fields])=>{
//     res.render("store/homeList", {
//       registeredHomes: registeredHomes,
//       pageTitle: "Home List",
//       currentPage: "Home",
//     });
//   });
// };

// exports.getHomes = (req, res, next) => {
//   Home.fetchAll((registeredHomes) => {
//     res.render("store/homeList", {
//       registeredHomes: registeredHomes,
//       pageTitle: "Home List",
//       currentPage: "Home",
//     });
//   });
// };

// exports.getBookings = (req, res, next) => {
//   res.render("store/booking", {
//     pageTitle: "my bookings",
//     currentPage: "bookings",
//   });
// };

// exports.getFavoriteList=(req, res, next) => {
//   Favorite.getFavorites().then(favorites=>{
//     favorites = favorites.map(fav=>fav.houseId)
//     Home.fetchAll().then(registeredHomes=>{
//       const favoriteHomes=registeredHomes.filter(home=>favorites.includes(home._id.toString()));
//       res.render("store/favoriteList", {
//         favoriteHomes: favoriteHomes,
//         pageTitle: "my favorites",
//         currentPage: "favorites",
//       });
//     });
//   });
// };
// exports.getFavoriteList=(req, res, next) => {
//   Favorite.getFavorites((favorites)=>{
//     Home.fetchAll().then(([registeredHomes,fields])=>{
//       const favoriteHomes=registeredHomes.filter(home=>favorites.includes(home._id))
//       res.render("store/favoriteList", {
//         favoriteHomes: favoriteHomes,
//         pageTitle: "my favorites",
//         currentPage: "favorites",
//       });
//     });
//   });
// };
// exports.getFavoriteList = (req, res, next) => {
//   Favorite.getFavorites((favorites) => {
//     Home.fetchAll((registeredHomes) => {
//       const favoriteHomes = registeredHomes.filter((home) =>
//         favorites.includes(home._id)
//       );
//       res.render("store/favoriteList", {
//         favoriteHomes: favoriteHomes,
//         pageTitle: "my favorites",
//         currentPage: "favorites",
//       });
//     });
//   });
// };

// exports.postAddToFavorite = (req, res, next) => {
//   const homeId=req.body.id;
//   const fav = new Favorite(homeId);
//   console.log('id is : ',homeId);

//   fav.save().then(result=>{
//     console.log('added successfully : ',result);
//   }).catch(error=>{
//     console.log('error while adding to fav : ',error);
//   }).finally(()=>{
//     res.redirect('/favorites');
//   });
  
// };

// exports.postRemoveFavorite = (req, res, next) => {
//   const homeId = req.params.homeId;

//   Favorite.deleteById(homeId).then(result=>{
//     console.log('favorite removed : ',result);
//   }).catch(error=>{
//     console.log('error while removing fav : ',error);
//   }).finally(()=>{
//     res.redirect('/favorites');
//   });
 
// };

// exports.getHomeDetails = (req, res, next) => {
//   const homeId =req.params.homeId;

//   Home.findById(homeId).then(([homes])=>{

//     const home = homes[0];

//     if(!home){
//       console.log('home not found');
//       res.redirect("/homes");
//     }
//     else{
//       res.render("store/homeDetails",
//         {
//           home:home,
//           pageTitle:"Home Details",
//           currentPage:"Home"
//         }
//       );
//     }
//   })
// };

// exports.getHomeDetails = (req, res, next) => {
//   const homeId = req.params.homeId;

//   Home.findById(homeId, (home) => {
//     if (!home) {
//       console.log("home not found");
//       res.redirect("/homes");
//     } else {
//       res.render("store/homeDetails", {
//         home: home,
//         pageTitle: "Home Details",
//         currentPage: "Home",
//       });
//     }
//   });
// };
