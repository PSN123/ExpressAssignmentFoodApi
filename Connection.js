const mongoose=require('mongoose');

const Fooddb="mongodb+srv://PradeepNegi:pradeep1997@cluster0.glus0.mongodb.net/FoodDB?retryWrites=true&w=majority";

mongoose.connect(Fooddb,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connection Successfull");
}).catch((err)=>console.log(err));
