import React,{useState} from "react";
import { useHistory } from "react-router";
const Signup = () => {
    const history=useHistory();
const [userSignupinfo,setUserupinfo]=useState({
    FirstName:'',
    LastName:'',
    City:'',
    Email:'',
    UserName:'',
    PhoneNumber:'',
    Password:'',
    is_active:''
});

const InputEventhandler=(e)=>{
const {name,value}=e.target;
// const is_active=e.target.checked;
setUserupinfo(()=>{
    return{
        ...userSignupinfo,
        [name]:value,
        // [name.is_active]:e.target.checked
    }
})
}

const saveUserDetails= async(e)=>{
    e.preventDefault();
    const{ FirstName,LastName,City,Email,UserName,PhoneNumber,Password,is_active} =userSignupinfo;
    if(FirstName===""|| LastName==="" || City==='' || Email==='' || UserName==='' || PhoneNumber===''|| Password===''){
        alert('All fileds are Mandatory')
    }else if(isNaN(PhoneNumber)){
        alert('Only number allowed here')
    }else{
     alert('Data Submit successfully')
     history.push("/")
     
    }
    const res=await fetch('http://localhost:5000/Signup',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            FirstName,LastName,City,Email,UserName,PhoneNumber,Password,is_active
        })
    });
    const userData=await res.json();
    console.log(userData);
    if(res.status===422 || !userData){
        window.alert("Invalid registration");
        console.log(res.status);
      }else{
        window.alert("Successfull registration");
        console.log(res.status);  
    }    
    
}

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 ">
                        <div className="card" style={{ width: '40rem' }}>
                            <div className="card-body">
                                <h5 className="card-title text-center">SignUp</h5>
                                <form method="POST" >
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">FirstName</label>
                                        <input type="text" 
                                        className="form-control" 
                                        id="FirstName" 
                                        name="FirstName"
                                        value={userSignupinfo.FirstName}
                                        onChange={InputEventhandler} 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">LastName</label>
                                        <input type="text" 
                                        className="form-control" id="LastName" 
                                        name="LastName" aria-describedby="emailHelp"
                                        value={userSignupinfo.LastName}
                                        onChange={InputEventhandler} 
                                        
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                                        <select className="form-select" aria-label="Default select example"
                                        name="City"
                                        value={userSignupinfo.City}
                                        onChange={InputEventhandler}
                                        >
                                            <option selected>Select City</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Dehradun">Dehradun</option>
                                            <option value="Mohali">Mohali</option>
                                        </select>              </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="Email" 
                                        name="Email" aria-describedby="emailHelp"
                                        value={userSignupinfo.Email}
                                        onChange={InputEventhandler}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">UserName</label>
                                        <input type="text" className="form-control" id="UserName" 
                                        name="UserName" aria-describedby="emailHelp"
                                        value={userSignupinfo.UserName}
                                        onChange={InputEventhandler}
                                    
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">PhoneNumber</label>
                                        <input type="text" className="form-control" id="PhoneNumber" 
                                        name="PhoneNumber" aria-describedby="emailHelp"
                                        value={userSignupinfo.PhoneNumber}
                                        onChange={InputEventhandler}
                                    
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="Password" 
                                        name="Password" aria-describedby="emailHelp"
                                        value={userSignupinfo.Password}
                                        onChange={InputEventhandler}
                                    
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" 
                                          name="is_active"
                                          value={userSignupinfo.is_active}
                                          onChange={InputEventhandler}
                                        
                                        />
                                        <label class="form-check-label" for="exampleCheck1">   Is Active</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={saveUserDetails}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;