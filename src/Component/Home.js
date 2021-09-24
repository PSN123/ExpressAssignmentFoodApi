import React, { useEffect ,useState } from 'react'

const Home = () => {
const [cityFoodfilter,setcityFoodfilter]=useState([]);

const userCityfoodfilter = async()=>{
   const userdata=localStorage.getItem("userDetails")
   const data=JSON.parse(userdata);
   const City=data.City;
   const CityName=await fetch(`http://localhost:5000/Foodfilter/${City}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({City})
    });
    let city=await CityName.json();
    setcityFoodfilter(city);
    console.log("data",cityFoodfilter);
}

useEffect(()=>{
    userCityfoodfilter();
},[])



    return (
        <div>
            <div className="container-fluid">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-8">
                    <h1 className="text text-center">Welcome</h1> 
                    <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            {/* <th scope="col">Title</th> */}
                                            <th scope="col">Subtitle</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Is_Available</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            cityFoodfilter.map((currentItem,index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{currentItem.Title}</td>
                                                            <td>{currentItem.Subtitle}</td>
                                                            <td>{currentItem.Price}</td>
                                                            <td>{currentItem.City}</td>
                                                            {currentItem.Is_Available ?<td>True</td>:<td>False</td>}
                                                    
                                                            <td><button type="button" className="btn btn-primary">Add To Cart</button></td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Home;
