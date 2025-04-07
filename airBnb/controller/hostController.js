//------------------code for mongoose 

const Home = require("../models/home");




exports.getHostHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render("host/hostHomeList", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "HostHomes",
      isLoggedIn:req.isLoggedIn
    });
  });
};

exports.getAddHome = (req, res, next) => {
  res.render("host/editHome", {
    pageTitle: "Add home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn:req.isLoggedIn
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing==='true';

  Home.findById(homeId).then(home=>{
    if(!home){
      console.log(`home not found for editing`);
      res.redirect("/host/hostHomeList")
    }
    res.render("host/editHome", {
      home:home,
      pageTitle: "Edit your Home",
      currentPage: "HostHomes",
      editing:editing,
      isLoggedIn:req.isLoggedIn
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const home = new Home({
    houseName:req.body.houseName,
    price:req.body.price,
    location:req.body.location,
    rating:req.body.rating,
    photoUrl:req.body.photoUrl,
    description:req.body.description
  });
  home.save().then(()=>{
    console.log(`home saved successfully`);
  });
  res.redirect("/host/host-home-list");
};

exports.getPostEditHome = (req, res, next) => {

  Home.findById(req.body.id).then((home)=>{
    home.houseName=req.body.houseName;
    home.price=req.body.price;
    home.location=req.body.location;
    home.rating=req.body.rating;
    home.photoUrl=req.body.photoUrl;
    home.description=req.body.description;
    
    home.save().then(result=>{
      console.log('home updated',result);
    }).catch(err=>{
      console.log('error while updating home : ',err);
    });
    res.redirect("/host/host-home-list");
  }).catch(err=>{
    console.log('error while finding home : ',err);
  })
  
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log(`error while deleting`, error);
    });
};

//commenting previous code which used in file writing database(fake database eg.home.json) ,new code for real database(sql)
// ----- code for-----SQL and mongoDB is same(destructing not required)  ---diff for fileBased database
//---- now commenting  code for SQL  
//---- now commenting  code for mongoDB



// const Home = require("../models/home");




// exports.getHostHomes = (req, res, next) => {
//   Home.fetchAll().then(registeredHomes => {
//     res.render("host/hostHomeList", {
//       registeredHomes: registeredHomes,
//       pageTitle: "Host Home List",
//       currentPage: "HostHomes",
//     });
//   });
// };

// exports.getHostHomes = (req, res, next) => {
//   Home.fetchAll().then(([registeredHomes, fields]) => {
//     res.render("host/hostHomeList", {
//       registeredHomes: registeredHomes,
//       pageTitle: "Host Home List",
//       currentPage: "HostHomes",
//     });
//   });
// };
// exports.getHostHomes = (req, res, next) => {
//   Home.fetchAll((registeredHomes) => {
//     console.log('fetched sucessfully',registeredHomes);
//     res.render("host/hostHomeList", {
//       registeredHomes: registeredHomes,
//       pageTitle: "Host Home List",
//       currentPage: "HostHomes",
//     });
//   });
// };

// exports.getAddHome = (req, res, next) => {
//   res.render("host/editHome", {
//     pageTitle: "Add home to airbnb",
//     currentPage: "addHome",
//     editing: false,
//   });
// };

// exports.getEditHome = (req, res, next) => {
//   const homeId = req.params.homeId;
//   const editing = req.query.editing === "true";

//   Home.findById(homeId).then(([homes]) => {
//     const home = homes[0];
//     if (!home) {
//       console.log(`home not found for editing`);
//       res.redirect("/host/hostHomeList");
//     }
//     res.render("host/editHome", {
//       home: home,
//       pageTitle: "Edit your Home",
//       currentPage: "HostHomes",
//       editing: editing,
//     });
//   });
// };
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

// exports.postAddHome = (req, res, next) => {
//   const home = new Home(
//     req.body.houseName,
//     req.body.price,
//     req.body.location,
//     req.body.rating,
//     req.body.photoUrl,
//     req.body.description
//   );
//   home.save().then(()=>{
//     console.log(`home saved successfully`);
//   });
//   res.redirect("/host/host-home-list");
// };

// exports.getPostEditHome = (req, res, next) => {
//   const home = new Home(
//     req.body.houseName,
//     req.body.price,
//     req.body.location,
//     req.body.rating,
//     req.body.photoUrl,
//     req.body.description,
//     req.body._id
//   );

//   home.save().then(result=>{
//     console.log('home updated',result);
//   });
//   res.redirect("/host/host-home-list");
// };

// exports.postDeleteHome = (req, res, next) => {
//   const homeId = req.params.homeId;
//   Home.deleteById(homeId)
//     .then(() => {
//       res.redirect("/host/host-home-list");
//     })
//     .catch((error) => {
//       console.log(`error while deleting`, error);
//     });
// };
// exports.postDeleteHome = (req, res, next) => {
//   const homeId=req.params.homeId;
//   Home.deleteById(homeId,error=>{
//     if(error){
//       console.log(`error while deleting`,error);
//     }
//     res.redirect("/host/host-home-list");
//   })
// };
