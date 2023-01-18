import React, {useEffect, useState} from 'react';
import rentalFacade from "../utils/rentalFacade.js";
import userFacade from "../utils/userFacade.js";

function UserPanel() {
    const [tenantId, setTenantId] = useState();
    const [rentals, setRentals] = useState([]);
    // const [selectedHouse, setSelectedHouse] = useState(0);
    const [showHouse, setShowHouse] = useState(false);
    const [refresh, setRefresh] = useState(false);

    // useEffect(() => {
    //     const getData = async () => {
    //         await trainingFacade.getTrainingSessionsByUser(user, (data) => {
    //             setMyTraining(data)
    //         }, "Error can't fetch user's training sessions!")
    //     }
    //     getData();
    // }, [refresh]);

    const getRentals = (event) => {
        rentalFacade.getRentalsByTenant(tenantId).then((data) => {
            setRentals(data)
        })
        event.preventDefault();
    }

    const house = (data) => {
        return (
            <div>
                <td>{data.houseHouse.houseNumberOfRooms}</td>
                <td>{data.houseHouse.address.streetAddress}, {data.houseHouse.address.cityInfo.zipCode} {data.houseHouse.address.cityInfo.cityName}</td>
            </div>
        )
    }

    const handleChange = (event) => {
        const value = event.target.value;
        console.log(value)
        setTenantId(event.target.value)
    }

    const handleRefresh = (evt) => {
        evt.preventDefault
    }

    return (
        <div className="tableBody">
            <h1>Rentals</h1>
            <h1>
                <form onSubmit={getRentals}>
                    <td>get rentals by tenant id:<input type="number" placeholder={"tenant id"} onChange={handleChange}
                                                        name={"title"} maxLength={45}/></td>
                    <button onClick={getRentals}>find rentals</button>
                </form>
            </h1>
            <table>
                <thead>
                <tr className={"blue"}>
                    <th>start date</th>
                    <th>end date</th>
                    <th>annual price</th>
                    <th>deposit</th>
                    <th>contact person</th>
                    <th>house info</th>
                      {showHouse ? (
                                <>
                                    <th>number of room</th>
                                    <th>address</th>
                                </>
                            ) : (<div></div>)}
                </tr>
                </thead>
                <tbody>
                {rentals.map((data) => {
                    return (
                        <tr key={data.id}>
                            <td>{data.rentalStartDate.year}-{data.rentalStartDate.month}-{data.rentalStartDate.day}</td>
                            <td>{data.rentalEndDate.year}-{data.rentalEndDate.month}-{data.rentalEndDate.day}</td>
                            <td>{data.rentalPriceAnnual}</td>
                            <td>{data.rentalDeposit}</td>
                            <td>{data.rentalContactPerson}</td>
                            <td>
                                <button onClick={() => {
                                    setShowHouse(!showHouse)
                                    // if(selectedHouse ===0) {
                                        setSelectedHouse(data.id)
                                    // }else{
                                    //     setSelectedHouse(0)
                                    // }

                                } }>toggle house details</button>
                            </td>
                            {showHouse ? (
                                <>
                                    <td>{data.houseHouse.houseNumberOfRooms}</td>
                                    <td>{data.houseHouse.address.streetAddress}, {data.houseHouse.address.cityInfo.zipCode} {data.houseHouse.address.cityInfo.cityName}</td>
                                </>
                            ) : (<></>)}
                            {/*<td>{data.houseHouse.houseNumberOfRooms}</td>*/}
                            {/*<td>{data.houseHouse.address.streetAddress}, {data.houseHouse.address.cityInfo.zipCode} {data.houseHouse.address.cityInfo.cityName}</td>*/}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default UserPanel;
