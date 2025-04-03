//commenting previous code which used in file writing database(fake database eg.home.json) ,new code for real database(sql,mongoDB)

const Home = require("../models/home");

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes, fields]) => {
    res.render("host/hostHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "HostHomes",
    });
  });
};
// exports.getHostHomes = (req, res, next) => {
//   Home.fetchAll((registeredHomes) => {
//     res.render("host/hostHomeList", {
//       registeredHomes: registeredHomes,
//       pageTitle: "Host Home List",
//       currentPage: "HostHomes",
//     });
//   });
// };

exports.getAddHome = (req, res, next) => {
  res.render("host/editHome", {
    pageTitle: "Add home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      console.log(`home not found for editing`);
      res.redirect("/host/hostHomeList");
    }
    res.render("host/editHome", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "HostHomes",
      editing: editing,
    });
  });
};
// exports.getEditHome = (req, res, next) => {
//   const homeId = req.params.homeId;
//   const editing = req.query.editing==='true';

//   Home.findById(homeId,home=>{
//     if(!home){
//       console.log(`home not found for editing`);
//       res.redirect("/host/hostHomeList")
//     }
//     res.render("host/editHome", {
//       home:home,
//       pageTitle: "Edit your Home",
//       currentPage: "HostHomes",
//       editing:editing
//     });
//   });
// };

exports.postAddHome = (req, res, next) => {
  const home = new Home(
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photoUrl,
    req.body.description
  );
  home.save();
  res.redirect("/host/host-home-list");
};

exports.getPostEditHome = (req, res, next) => {
  const home = new Home(
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photoUrl,
    req.body.description,
    req.body.id
  );

  home.save();
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log(`error while deleting`, error);
    });
};
// exports.postDeleteHome = (req, res, next) => {
//   const homeId=req.params.homeId;
//   Home.deleteById(homeId,error=>{
//     if(error){
//       console.log(`error while deleting`,error);
//     }
//     res.redirect("/host/host-home-list");
//   })
// };
