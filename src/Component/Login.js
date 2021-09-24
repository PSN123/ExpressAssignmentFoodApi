import React, { useState } from 'react';
import {NavLink,useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory();
  const [userLoginCredential,setUserLoginCredential] =useState({  email:'',password:''});
 
  const userloginHandler=(e)=>{
    const {name,value}=e.target;
    setUserLoginCredential(()=>{
      return{
        ...userLoginCredential,
        [name]:value
      }
    })
  } 

  const userLogin = async (e) => {
    e.preventDefault();
    const {email,password}=userLoginCredential;
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    let userinfo =await res.json();
    console.log("Data",userinfo);
    
    if (email === "" || password === "") {
      window.alert("Credential required");
    } else if (res.status === 400 || !res) {
      window.alert("Invalid credential");
    } else {
      localStorage.setItem("userDetails",JSON.stringify(userinfo));
      window.alert("login successfully");
      history.push("/Home");
    }

  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
          <div className="card" style={{ width: '40rem' }}>
          <div className="card-body">
          <h5 className="card-title text-center">SignUp</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"
                  value={userLoginCredential.email}
                  onChange={userloginHandler}
                  placeholder="Email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" id="password" name="password" className="form-control"
                  value={userLoginCredential.password}
                  onChange={userloginHandler}
                  placeholder="Password"
                />
              </div>
              <div className="btn-group btn-lg btn-block d-flex justify-content-center">  
              <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={userLogin}>Login</button><br/>
              <NavLink type="submit" className="btn btn-success btn-lg btn-block" to="/SignUp">SignUp</NavLink> 
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default Login;