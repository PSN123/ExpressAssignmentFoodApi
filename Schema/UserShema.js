const mongoose=require('mongoose');


const userinformation = new mongoose.Schema({
    FirstName:{
        type:String,       
    },
    LastName:{
        type:String,
       
    },
    City:{
        type:String,
        
    },
    Email:{
        type:String,
        
    },
    UserName:{
        type:String,
        
    },
    PhoneNumber:{
        type:String,
       
    },
    Password:{
        type:String
    },
    is_active:{
        type:Boolean
    }
});

const UserInfo = mongoose.model('FoodApiUserInfo',userinformation);


exports.module= UserInfo;