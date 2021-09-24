import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { NavLink, useParams } from 'react-router-dom';


const Userpanel = () => {
    const updateUserity = JSON.parse(localStorage.getItem("userDetails"));    
    const Name=updateUserity.City;
    const { id } = useParams();
    const [foodData, setFoodData] = useState([]);
    const [changeCity,setchangeCity]=useState(); 

    //User Console 

    const userCityUpdate = async (e) => {
        
        //setchangeCity(e.target.value)
        //console.log(changeCity);
        let City = e.target.value;
        const _id = updateUserity._id;
        console.log("city",Name)
        const CityName = await fetch(`http://localhost:5000/cityUpdate/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ City })
        });
        // let data =CityName.json();
        // console.log(data);

        let updateCity=JSON.parse(localStorage.getItem("userDetails"));
        updateCity.City = City;
        localStorage.setItem("userDetails",JSON.stringify(updateCity));
    }

    // userCityUpdate();

    //Manage Food Code =>

    const fetchData = async () => {
        const url = `http://localhost:5000/GetFoodItems`;
        const response = await fetch(url);
        const resjson = await response.json();
        setFoodData(resjson);
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(foodData);

    const DeleteItem = async (index) => {
        let a = index;
        console.log(a);
        const ok = window.confirm('are you sure??', a);
        if (ok === true) {
            alert('Item Deleted Successfully');
            const res = await fetch(`http://localhost:5000/DeleteItem/${a}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            fetchData();
        } else {
            alert('No Item Delete');
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-8">
                        <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
                        <Tab label="User Setting">
                                <div className="mb-3">
                                    <label className="form-label">Change City</label>
                                    <select className="form-select"
                                        name="City"
                                        value={changeCity}
                                        onChange={(e) =>userCityUpdate(e)}
                                        // onInput={userCityUpdate}
                                    >
                                        <option selected>{Name}</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Dehradun">Dehradun</option>
                                        <option value="Mohali">Mohali</option>
                                    </select>              
                                    </div>
                            </Tab>
                           
                            <Tab label="Manage Food">
                                <NavLink type="button" className="btn btn-primary mt-2 mx-4" to="/AddFood">Add Food</NavLink>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Subtitle</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Is_Available</th>
                                            <th scope="col">Delete</th>
                                            <th scope="col">Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            foodData.map((currentItem, index) => {
                                                return (
                                                    <>
                                                        <tr key={currentItem.id}>
                                                            <td>{currentItem.Title}</td>
                                                            <td>{currentItem.Subtitle}</td>
                                                            <td>{currentItem.Price}</td>
                                                            <td>{currentItem.City}</td>
                                                            {currentItem.Is_Available ? <td>True</td> : <td>False</td>}

                                                            <td><button type="button" className="btn btn-danger" onClick={() => DeleteItem(currentItem._id)}>Delete</button></td>
                                                            <td><NavLink type="button" className="btn btn-primary" to={`/UpdateFood/${currentItem._id}`}>Update</NavLink></td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Tab>
                           
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userpanel;