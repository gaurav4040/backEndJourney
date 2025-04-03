const Favorite = require("../models/favorite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb home",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/homeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Home List",
      currentPage: "Home",
    });
  });
};



exports.getBookings=(req, res, next) => {
    res.render("store/booking", {
      pageTitle: "my bookings",
      currentPage: "bookings",
    });
};


exports.getFavoriteList=(req, res, next) => {
  Favorite.getFavorites((favorites)=>{
    Home.fetchAll((registeredHomes) => {
      const favoriteHomes=registeredHomes.filter(home=>favorites.includes(home.id))
      res.render("store/favoriteList", {
        favoriteHomes: favoriteHomes,
        pageTitle: "my favorites",
        currentPage: "favorites",
      });
    });
  });
};

exports.postAddToFavorite=(req,res,next)=>{

  Favorite.addToFavorite(req.body.id,(error)=>{
    if(error){
      console.log("error while marking favorites",error);
    }
    res.redirect("/favorites")
  });
};

exports.postRemoveFavorite=(req,res,next)=>{

  const homeId = req.params.homeId;

  Favorite.deleteById(homeId,error=>{
    if(error){
      console.log(`error removing from favorite`,error);
    }
    res.redirect("/favorites")
  });
      
};

exports.getHomeDetails = (req, res, next) => {
  const homeId =req.params.homeId;

  Home.findById(homeId,home=>{
    if(!home){
      res.redirect("/homes");
    }
    else{

      res.render("store/homeDetails",
        {
          home:home,
          pageTitle:"Home Details",
          currentPage:"Home"
        }
      );
    }
  })

};
