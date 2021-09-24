const mongoose=require('mongoose');

const FoodSchems=new mongoose.Schema({
    Title:{
        type:String,
    },
    Subtitle:{
        type:String,
    },
    City:{
        type:String,
    },
    Price:{
        type:Number,
    },
    Is_Available:{
        type:false,
    }
})

const foodItemDetails=mongoose.model('FoodApiFoodInfo',FoodSchems);

module.exports=foodItemDetails;