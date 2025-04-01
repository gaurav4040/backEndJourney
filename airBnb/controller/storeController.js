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
    res.render("store/homePageList", {
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
  Home.fetchAll((registeredHomes) => {
    res.render("store/favoriteList", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb home",
      currentPage: "favorites",
    });
  });
};

