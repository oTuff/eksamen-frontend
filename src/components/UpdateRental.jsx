import React, {useEffect, useState} from 'react';
import rentalFacade from "../utils/rentalFacade.js";
import homeFacade from "../utils/homeFacade.js";

function UpdateRental({rentalId, refresh, setRefresh, setErrorMessage}) {
    const [rental, setRental] = useState({});
    const [tenantData, setTenantData] = useState([]);
    const [houseData, setHouseData] = useState([]);
    const [editTenant, setEditTenant] = useState(false)
    const [editHouse, setEditHouse] = useState(false)
    // const [refresh, setRefresh] = useState();
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        const getData = async () => {
            await rentalFacade.getRentalById(rentalId).then((data) => {
                setRental(data)
            }, setErrorMessage)
        }
        getData();
        console.log(rental)
    }, [refresh]);

    useEffect(() => {
        const getData = async () => {
            await homeFacade.getAllHomes((data) => {
                setHouseData(data)
            }, setErrorMessage)
        }
        getData();
        console.log(houseData);
        console.log(rental)
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

    // let tenantList = tenantData.length > 0
    //     && tenantData.map((item) => {
    //         return (
    //             <option key={item.id} value={item.id}>{item.id}</option>
    //         )
    //     }, this);
    //
    let houseList = houseData.length > 0
        && houseData.map((item) => {
            return (
                <option key={item.id}
                        value={item.id}>{item.address.streetAddress},{item.address.cityInfo.zipCode} {item.address.cityInfo.cityName}</option>
            )
        }, this);


    return (
        <div className="tableBody">
            <h1>update a rental</h1>
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
                        <td><input type="date"
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
                            {/*{tenantList}*/}
                        </select>
                            <p>or</p>
                            <button onClick={() => setEditTenant(!editTenant)}>add/edit a new tenant</button>
                        </td>
                        <td>
                            <select name="house" onChange={handleChange}>
                                <option disabled={true} selected={true}>Choose house</option>
                                {houseList}
                            </select>
                            <p>or</p>
                            <button onClick={() => setEditHouse(!editHouse)}>add/edit a new house</button>
                        </td>

                        <td>
                            <button onClick={() => {
                                // const chosenHouse = houseList.find((house) => house.id === inputs.house);
                                // gethousby id api method
                                // console.log(inputs.house)
                                // console.log((chosenHouse))
                                // if (inputs.house >0){
                                //     setInputs(values => ({...values, ["houseNumberOfRooms"]: chosenHouse.houseNumberOfRooms}))//..osv
                                //
                                // }

                                const json = {
                                    "id": rentalId,
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
                                        "id": inputs.house,
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
                                            // "id": inputs.tenant,
                                            "tenantName": inputs.tenantName,
                                            "tenantPhone": inputs.tenantPhone,
                                            "tenantJob": inputs.tenantPhone
                                        }
                                    ]
                                }
                                console.log(json)
                                rentalFacade.updateRental(json).then(() => {
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
    );
}

export default UpdateRental;