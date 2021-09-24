import React,{useState,useEffect} from "react";
import { useHistory,useParams } from "react-router-dom";

const UpdateFood=()=>{
   const fetchData = async () => {
        const url = `http://localhost:5000/GetFoodItems`;
        const response = await fetch(url);           
        const resjson = await response.json();
        setupdateFoodDetails(resjson);   
    }



    useEffect(() => {
        fetchData();
    }, []);



const history=useHistory();
const {id}=useParams();
const [updatefoodDetails,setupdateFoodDetails]=useState({
    Title:'',
    Subtitle:'',
    City:'',
    Price:'',
    Is_Available:''
});

const foodDetailsHandler=(e)=>{
    const{name,value}=e.target;
    setupdateFoodDetails(()=>{
        return{
            ...updatefoodDetails,
            [name]:value
        }
    })
}

const FoodDataSignup=async (e)=>{
    e.preventDefault();
const{Title,Subtitle,City,Price,Is_Available}=updatefoodDetails;

console.log(updatefoodDetails);

if(Title==="" || Subtitle==="" || City==="" || Price===""){
    alert('All fields are madatory')
}else{
const res=await fetch(`http://localhost:5000/Update/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            Title,Subtitle,City,Price,Is_Available
        })
    });
    if(res){
        alert('Data Upload successfully');
        // history.push("/Userpanel");
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
                                <h5 className="card-title text-center">Update FoodItem</h5>
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input type="text" 
                                        className="form-control" 
                                        id="Title" 
                                        name="Title"
                                        value={updatefoodDetails.Title}
                                        onChange={foodDetailsHandler} 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Subtitle</label>
                                        <input type="text" 
                                        className="form-control" id="Subtitle" 
                                        name="Subtitle" 
                                        value={updatefoodDetails.Subtitle}
                                        onChange={foodDetailsHandler} 
                                        
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">City</label>
                                        <select className="form-select"
                                        name="City"
                                        value={updatefoodDetails.City}
                                        onChange={foodDetailsHandler}
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
                                        value={updatefoodDetails.Price}
                                        onChange={foodDetailsHandler}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" 
                                          name="Is_Available"
                                          value={updatefoodDetails.Is_Available}
                                          onChange={foodDetailsHandler}                                        
                                        />
                                        <label class="form-check-label" for="exampleCheck1"> Is Available</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={FoodDataSignup}>Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateFood;