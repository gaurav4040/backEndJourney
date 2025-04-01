const Home = require("../models/home");

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("host/hostHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "HostHomes",
    });
  });
};


exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add home to airbnb",
    currentPage: "addHome",
  });
};

exports.postAddHome = (req, res, next) => {
  const home = new Home(
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photoUrl
  );
  home.save();
  res.render("host/homeAdded", {
    pageTitle: "home added successfully",
    currentPage: "homeAdded",
  });
};


