const express = require('express');
const mongoose=require('mongoose');
const app=express();
const cors=require("cors");

const corsOptions ={
    origin:'*', 
    credentials:true,         
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions));

require('./Connection');
const foodItemDetails = require("./Schema/FoodSchema");

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
    // is_active:{
    //     type:Boolean
    // }
});

const UserInfo = mongoose.model('FoodApiUserInfo',userinformation);

app.use(express.json());


//Food API Endpoints
/////////////////////////////////////////////
app.post('/Fooditem',async (req,res)=>{
    const {Title,Subtitle,City,Price,Is_Available}=req.body;
    try{
        const Foodinformation= new foodItemDetails({Title,Subtitle,City,Price,Is_Available});
        await Foodinformation.save();
        console.log(Foodinformation);
        res.send('Gone');
    }catch(err){
        res.send("not post");
        console.log(err);    
    }

})

//FoodbyCityfilter
app.post('/Foodfilter/:city',async (req,res)=>{
    let City=req.body.City;
    try{
        const userlog=await foodItemDetails.find({City})
        console.log(userlog);
        if(!userlog){
            res.status(400).json({error:"invalid credential pass"});
        }else{
            res.json(userlog);
        }
    }catch(err){
        console.log(err)
    }
});

//Updateing user City

app.put('/cityUpdate/:id',async(req,res)=>{
    const _id=req.params.id
    // const City=req.body.City;
    console.log(_id);
    try{

    const updated=await UserInfo.findByIdAndUpdate({_id},req.body)
      console.log(updated);
      res.send(updated);
    }catch(err){
        console.log(err);
        res.send(err);
    }
})





app.get('/GetFoodItems',async(req,res)=>{
    try{
        foodItemDetails.find({},(err,userinfo)=>{
            if(err){
                console.log(err);
            }else{
                console.log(userinfo);
                //  res.write(JSON.stringify(userinfo));
                 res.end(JSON.stringify(userinfo));
            }
        })
    }catch(err){
        console.log(err);
    }
})

app.delete('/DeleteItem/:id',async(req,res)=>{
    const _id=req.params.id
    console.log(_id);
    try{
        const Deleted=await foodItemDetails.findByIdAndDelete({_id})
          console.log(Deleted);
        }catch(err){
               res.json({message : "Deleted "});
        }
})


app.put('/Update/:id',async(req,res)=>{
    const _id=req.params.id
    try{
    const updated=await foodItemDetails.findByIdAndUpdate({_id},req.body)
      console.log(updated);
      res.send('ok');
    }catch(err){
        console.log(err);
        res.send(err);
    }
})




/////////////////////////////////////////////

//UserInformation API Endpoints
app.post('/Signup',async (req,res)=>{
    const {FirstName,LastName,City,Email,UserName,PhoneNumber,Password,is_active}=req.body
    console.log(req.body);
    try{
        const userData=new UserInfo({FirstName,LastName,Email,City,UserName,PhoneNumber,Password,is_active});
        console.log(userData);
       await userData.save();
        // console.log(saveuserData)
    }catch(err){
        res.send(err);
    }
})

app.post('/login',async (req,res)=>{
    console.log(req.body);
    try{
        const {email,password}=req.body;
        const userlog=await UserInfo.findOne({Email:email,Password:password})
        console.log(userlog);
        if(!userlog){
            res.status(400).json({error:"invalid credential pass"});
        }else{
            res.json(userlog);
        }
    }catch(err){
        console.log(err)
    }
});


app.put('/Update/:id',async(req,res)=>{
    const _id=req.params.id
    try{
    const updated=await UserInfo.findByIdAndUpdate({_id},req.body)
      console.log(updated);
    }catch(err){
        console.log(err);
    }
})

app.delete('/Delete/:id',async(req,res)=>{
    const _id=req.params.id
    try{
    const Deleted=await UserInfo.findByIdAndDelete({_id})
      console.log(Deleted);
    }catch(err){
        console.log(err);
    }
})

app.get('/GetUser',(req,res)=>{
    try{
        UserInfo.find({},(err,userinfo)=>{
            if(err){
                console.log(err);
            }else{
                console.log(userinfo);
                //  res.write(JSON.stringify(userinfo));
                 res.end(JSON.stringify(userinfo));
            }
        })
    }catch(err){
        console.log(err);
    }
})

app.listen(5000, () => {
    console.log("server running at 5000");
});