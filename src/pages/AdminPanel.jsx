import React, {useEffect, useState} from 'react';
import "../styles/adminpanel.css";
import rentalFacade from "../utils/rentalFacade.js";

function AdminPanel({setErrorMessage}) {
    const [rentals, setRentals] = useState([]);
    const [tenantData, setTenantData] = useState([]);
    const [houseData, setHouseData] = useState([]);
    const [editTenant, setEditTenant] = useState(false)
    const [editHouse, setEditHouse] = useState(false)
    const [refresh, setRefresh] = useState(false);
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        const getData = async () => {
            await rentalFacade.getAllRentals((data) => {
                setRentals(data)
            }, setErrorMessage)
        }
        getData();
    }, [refresh]);

    useEffect(() => {
        const getData = async () => {
            // await rentalFacade.getAllRentals((data) => {
            //     setTenantData(data)
            //     console.log(tenantData)
            // }, setErrorMessage)
        }
        getData();
    }, [refresh]);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log("object: " + name + " : " + value)
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }


    const deleteRental = async (event) => {
        //     await rentalFacade.getAllRentals((data) => {
        //         setRentals(data)
        //     }, setErrorMessage)
        // }
        rentalFacade.deleteRental(inputs.rentalToDelete).then(r => console.log(r))
        setRefresh(!refresh)
        // .then((data) => {
        // setRentals(data)
        // })
        // event.preventDefault();
    }

    //https://scriptverse.academy/tutorials/reactjs-select.html :
    //could make the two below function into one with the array as a variable
    let tenantList = tenantData.length > 0
        && tenantData.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.id}</option>
            )
        }, this);

    let houseList = houseData.length > 0
        && houseData.map((item) => {
            return (
                <option key={item.id}
                        value={item.id}>{item.address.streetAddress},{item.address.cityInfo.zipCode} {item.address.cityInfo.cityName}</option>
            )
        }, this);

    return <>


        {/*create:*/}
        <div className="tableBody">
            <h1>creat a rental</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr className={"blue"}>
                        <th>start date</th>
                        <th>end date</th>
                        <th>annual price</th>
                        <th>deposit</th>
                        <th>contact person</th>
                        <th>Tenant</th>
                        <th>House</th>
                        <th>CREATE</th>
                    </tr>
                    <tr>
                        <td><input type="date" placeholder={"start date"}
                                   onChange={handleChange} name={"rentalStartDate"} maxLength={45}/></td>
                        <td><input type="date" placeholder={"end date"} onChange={handleChange}
                                   name={"rentalEndDate"}/></td>
                        <td><input type="number" placeholder={"annual price"} onChange={handleChange}
                                   name={"rentalPriceAnnual"}/></td>
                        <td><input type="number" placeholder={"deposit"}
                                   onChange={handleChange} name={"rentalDeposit"}/></td>
                        <td><input type="text" placeholder={"name of contact person"}
                                   onChange={handleChange} name={"rentalContactPerson"}/></td>
                        <td><select name={"tenant"} onChange={handleChange}>
                            <option disabled={true} selected={true}>Choose tenant</option>
                            {tenantList}
                        </select>
                            <p>or</p>
                            <button onClick={() => setEditTenant(!editTenant)}>add a new tenant</button>
                        </td>
                        <td>
                            <select name="house" onChange={handleChange}>
                                <option disabled={true} selected={true}>Choose house</option>
                                {houseList}
                            </select>
                            <p>or</p>
                            <button onClick={() => setEditHouse(!editHouse)}>add a new house</button>
                        </td>

                        <td>
                            <button onClick={() => {
                                const tenant1 = tenantData[inputs.tenant - 1]
                                console.log(tenant1)
                                const house = houseData[inputs.house - 1]

                                const json = {
                                    "rentalStartDate": {
                                        "year": inputs.rentalStartDate.substring(0, 4),
                                        "month": inputs.rentalStartDate.substring(5, 7),
                                        "day": inputs.rentalStartDate.substring(8)
                                    },
                                    "rentalEndDate": {
                                        "year": inputs.rentalEndDate.substring(0, 4),
                                        "month": inputs.rentalEndDate.substring(5, 7),
                                        "day": inputs.rentalEndDate.substring(8)
                                    },
                                    "rentalPriceAnnual": inputs.rentalPriceAnnual,
                                    "rentalDeposit": inputs.rentalDeposit,
                                    "rentalContactPerson": inputs.rentalContactPerson,
                                    "houseHouse": {
                                        "houseNumberOfRooms": inputs.houseNumberOfRooms,
                                        "address": {
                                            "streetAddress": inputs.streetAddress,
                                            "cityInfo": {
                                                "zipCode": inputs.zipCode
                                            }
                                        }
                                    },
                                    "tenants": [
                                        {
                                            "tenantName": inputs.tenantName,
                                            "tenantPhone": parseInt(inputs.tenantPhone),
                                            "tenantJob": inputs.tenantPhone
                                        }
                                    ]
                                }
                                console.log(json)
                                rentalFacade.createRental(json).then(() => {
                                    setRefresh(!refresh);
                                });
                            }}>Submit
                            </button>
                        </td>
                    </tr>

                    {/*adding new tenant and house:*/}
                    {editTenant ? (
                        <>
                            <tr>tenant:</tr>
                            <tr className={"blue"}>
                                <th>name</th>
                                <th>phone</th>
                                <th>Job</th>
                            </tr>
                            <td><input type="text" placeholder={"name of tenant"}
                                       onChange={handleChange} name={"tenantName"}/></td>
                            <td><input type="number" placeholder={"phonenumber"}
                                       onChange={handleChange} name={"tenantPhone"}/></td>
                            <td><input type="text" placeholder={"job of tenant"}
                                       onChange={handleChange} name={"tenantJob"}/></td>
                        </>
                    ) : (<></>)}
                    {editHouse ? (
                        <>
                            <tr>house:</tr>
                            <tr className={"blue"}>
                                <th>number of rooms</th>
                                <th>address</th>
                                <th>zipcode</th>
                            </tr>
                            <td><input type="number" placeholder={"number of rooms"}
                                       onChange={handleChange} name={"houseNumberOfRooms"}/></td>
                            <td><input type="text" placeholder={"address"}
                                       onChange={handleChange} name={"streetAddress"}/></td>
                            <td><input type="number" placeholder={"zip code"}
                                       onChange={handleChange} name={"zipCode"}/></td>

                        </>
                    ) : (<></>)}
                </table>
            </form>
        </div>

        {/*update boat:*/}
        {/*<div className="tableBody">*/}
        {/*    <h1>update boat</h1>*/}
        {/*    <form onSubmit={handleSubmit}>*/}
        {/*        <table>*/}
        {/*            <tr className={"blue"}>*/}
        {/*                <th>brand</th>*/}
        {/*                <th>make</th>*/}
        {/*                <th>name</th>*/}
        {/*                <th>image</th>*/}
        {/*                <th>harbour</th>*/}
        {/*                <th>owner(s)</th>*/}
        {/*                <th>CREATE</th>*/}
        {/*            </tr>*/}
        {/*            <tr>*/}
        {/*                <td><input type="text" placeholder={"brand"}*/}
        {/*                           onChange={handleChange} name={"boatBrand"} maxLength={45}/></td>*/}
        {/*                <td><input type="text" placeholder={"make"} onChange={handleChange}*/}
        {/*                           name={"boatMake"}/></td>*/}
        {/*                <td><input type="text" placeholder={"name"} onChange={handleChange}*/}
        {/*                           name={"boatName"}/></td>*/}
        {/*                <td><input type="text" placeholder={"image"}*/}
        {/*                           onChange={handleChange} name={"boatImage"}/></td>*/}

        {/*                <td><select name={"harbour"} onChange={handleChange}>*/}
        {/*                    <option disabled={true} selected={true}>Choose harbour</option>*/}
        {/*                    {harboursList}*/}
        {/*                </select>*/}
        {/*                </td>*/}
        {/*                <td>*/}
        {/*                    <select name="owners" onChange={handleChange} multiple={true}>*/}
        {/*                        <option disabled={true} selected={true}>Choose owner(s)</option>*/}
        {/*                        {ownersList}*/}
        {/*                    </select>*/}
        {/*                </td>*/}
        {/*                <td>*/}
        {/*                    <button onClick={() => {*/}
        {/*                        const harbour = tenantData[inputs.harbour - 1]*/}
        {/*                        const owners = [houseData[inputs.owners - 1]]//todo: can still only add one owner*/}
        {/*                        const json = {*/}
        {/*                            "boatBrand": inputs.boatBrand,*/}
        {/*                            "boatMake": inputs.boatBrand,*/}
        {/*                            "boatName": inputs.boatName,*/}
        {/*                            "boatImage": inputs.boatImage,*/}
        {/*                            harbour,*/}
        {/*                            owners*/}
        {/*                        }*/}
        {/*                        console.log(json)*/}
        {/*                        ownerFacade.createBoat(json).then(() => {*/}
        {/*                            setRefresh(!refresh);*/}
        {/*                        });*/}
        {/*                    }}>Submit*/}
        {/*                    </button>*/}
        {/*                </td>*/}
        {/*            </tr>*/}
        {/*        </table>*/}
        {/*    </form>*/}
        {/*</div>*/}


        {/*    simple delete*/}
        <div>
            <h1>Delete a rental(skrabet)</h1>
            <form onSubmit={handleSubmit}>
                <td>delete rental by id:<input type="number" placeholder={"rental id"}
                                               onChange={handleChange}
                                               name={"rentalToDelete"} maxLength={45}/></td>
                <button onClick={deleteRental}>delete rental</button>
            </form>
        </div>
    </>
}

export default AdminPanel
