import React,{useState} from "react";
import { useHistory } from "react-router";

const AddFood=()=>{
    const history=useHistory();
const [foodDetails,setFoodDetails]=useState({
    Title:'',
    Subtitle:'',
    City:'',
    Price:'',
    Is_Available:''
});

const foodDetailsHandler=(targetName,targetValue)=>{
    // const{name,value}=e.target;
    setFoodDetails(()=>{
        return{
            ...foodDetails,
            [targetName]:targetValue
        }
    })

}

const FoodDataSignup=async (e)=>{
e.preventDefault();
const{Title,Subtitle,City,Price,Is_Available}=foodDetails;
console.log(foodDetails);

if(Title==="" || Subtitle==="" || City==="" || Price===""){
    alert('All fields are madatory')
}else{
const res=await fetch('http://localhost:5000/Fooditem',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            Title,Subtitle,City,Price,Is_Available
        })
    });
    if(res){
        alert('Data Upload successfully');
        history.push("/Userpanel");
    }else{
        alert('Error');
    }
}
}

    return(
        <>
        <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 ">
                        <div className="card" style={{ width: '40rem' }}>
                            <div className="card-body">
                                <h5 className="card-title text-center">AddFood Details</h5>
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input type="text" 
                                        className="form-control" 
                                        id="Title" 
                                        name="Title"
                                        value={foodDetails.Title}
                                        onChange={(e)=> foodDetailsHandler(e.target.name,e.target.value)}
 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Subtitle</label>
                                        <input type="text" 
                                        className="form-control" id="Subtitle" 
                                        name="Subtitle" 
                                        value={foodDetails.Subtitle}
                                        onChange={(e)=> foodDetailsHandler(e.target.name,e.target.value)}

                                        
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">City</label>
                                        <select className="form-select"
                                        name="City"
                                        value={foodDetails.City}
                                        onChange={(e)=> foodDetailsHandler(e.target.name,e.target.value)}
                                        
                                        >
                                            <option selected>Select City</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Dehradun">Dehradun</option>
                                            <option value="Mohali">Mohali</option>
                                        </select>              </div>
                                    <div className="mb-3">
                                        <label className="form-label">Price</label>
                                        <input type="text" className="form-control" id="Price" 
                                        name="Price" 
                                        value={foodDetails.Price}
                                        onChange={(e)=> foodDetailsHandler(e.target.name,e.target.value)}
                                        
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" 
                                          name="Is_Available"
                                        onChange={(e)=> foodDetailsHandler(e.target.name,e.target.checked)}
                                                                                  
                                        />
                                        <label class="form-check-label" for="exampleCheck1"> Is Available</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={FoodDataSignup}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddFood;