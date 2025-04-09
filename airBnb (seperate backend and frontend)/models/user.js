 const mongoose = require('mongoose');

 const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    user_type:{
        type:String,
        enum:['guest','host'],
        default:'guest'
    },
    favorites:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Home',
    }]


 });

 module.exports=mongoose.model('User',userSchema);