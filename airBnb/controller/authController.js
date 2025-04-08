const {check,validationResult} = require('express-validator');
const User = require('../models/user');
const bcrypt =  require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login",
    currentPage: "login",
    isLoggedIn: false,
    errors:[],
    oldInput:{email_username:""},
    userName:{},
    Email:{}
  });
};

exports.postLogin = async (req, res, next) => {

  const {email_username,password} = req.body;

  const userName = await User.findOne({username:email_username});
  const Email = await User.findOne({email:email_username})
  
  let isMatch;

    if(userName){
       isMatch = await bcrypt.compare(password,userName.password);
    }
    else{
       isMatch = await bcrypt.compare(password,Email.password);
    }

    if(!userName&&!Email){
      return res.status(422).render("auth/login",{
        pageTitle:"login",
        currentPage:"login",
        isLoggedIn:false,
        errors:["email/userName and password is incorrect "],
        oldInput:{email_username},
        userName:{},
        Email:{}
      });
    }

    if(!isMatch){
      return res.status(422).render("auth/login",{
        pageTitle:"login",
        currentPage:"login",
        isLoggedIn:false,
        errors:["email/userName and password is incorrect "],
        oldInput:{email_username},
        userName:{},
        Email:{}
      });
    }
  

  req.session.isLoggedIn=true;

  req.session.userName=userName;
  await req.session.save();

  req.session.Email=Email;
  await req.session.save();

  // res.cookie("isLoggedIn", true);
  res.redirect("/");
};

exports.postLogout=(req,res,next)=>{
  req.session.destroy(()=>{
    res.redirect("/login");
  })
}

exports.getSignUp=(req,res,next)=>{
  res.render("auth/signup",{
    pageTitle:"signUp",
    currentPage:"signUp",
    isLoggedIn:false,
    errors:[],
    oldInput:{username:"",email:"",user_type:""},
    userName:{},
    Email:{}
  })
}

exports.postSignUp=[

  check("username")
  .trim()
  .isLength({min:7})
  .withMessage("UserName must contain at least 7 character")
  .matches(/[a-z0-9\s]+$/)
  .withMessage("username only contain lowercase alphabets and numbers"),

  check("email")
  .isEmail()
  .withMessage("Please Enter a valid Email")
  .normalizeEmail(),

  check("password")
  .isLength({min:8})
  .withMessage("password must contain at least 8 character")
  .matches(/[a-zA-Z\s]+$/)
  .withMessage("must contain at least one alphabet")
  .trim(),

  check('confirm_password')
  .trim()
  .custom((value,{req})=>{
    if(value!==req.body.password){
      throw new Error("passwords do not match");
    }
    return true;
  }),

  check("user_type")
  .notEmpty()
  .withMessage("Please select a type")
  .isIn(['guest','host'])
  .withMessage('Invalid user type'),

  check("terms")
  .notEmpty()
  .withMessage("Please accept the terms and conditions")
  .custom((value,{req})=>{
    if(value!=="on"){
      throw new Error("please accept the terms and conditions")
    }
    return true;
  }),

  (req,res,next)=>{
     const {username,email,password,user_type} = req.body;
     const errors= validationResult(req);
     if(!errors.isEmpty()){
      return res.status(422).render("auth/signup",{
        pageTitle:"signup",
        currentPage:"signup",
        isLoggedIn:false,
        errors:errors.array().map(err=>err.msg),
        oldInput:{username,email,user_type},
        userName:{},
        Email:{}
      });
     }

     bcrypt.hash(password,12).then(hashedPassword=>{
       const user = new User({username,email,password:hashedPassword,user_type});
      return user.save();
     }).then(()=>{
      res.redirect("/login")
     }).catch(err=>{
      return res.status(422).render("auth/signup",{
        pageTitle:"signup",
        currentPage:"signup",
        isLoggedIn:false,
        errors:[err.message],
        oldInput:{username,email,user_type},
        userName:{},
        Email:{}
      });
    });
  }
]