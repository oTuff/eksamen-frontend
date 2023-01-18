import React, {useEffect, useState} from 'react';
import "../styles/adminpanel.css";
import rentalFacade from "../utils/rentalFacade.js";
import UpdateRental from "../components/UpdateRental.jsx";
import CreateRental from "../components/CreateRental.jsx"

function AdminPanel({setErrorMessage}) {
    const [rentals, setRentals] = useState([]);
    const [chosenRental, setChosenRental] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [inputs, setInputs] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [tenantData, setTenantData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            await rentalFacade.getAllRentals((data) => {
                setRentals(data)
            }, setErrorMessage)
        }
        getData();
        console.log(rentals)
    }, [refresh]);

     let tenantList = tenantData.length > 0
        && tenantData.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.id}</option>
            )
        }, this);

    return (<>
        {/*update rental:*/}
        {showEdit ? (<UpdateRental rentalId={chosenRental}/>) : (<></>)}

        {/*create:*/}
        <div className="tableBody">
            {showCreate ? (
                <>
                    <button onClick={() => {
                        setShowCreate(false)
                    }}>cancel
                    </button>
                    <CreateRental/>
                </>
            ) : (
                <>
                    <button onClick={() => {
                        setShowCreate(true)
                    }}>create rental
                    </button>
                </>)}
        </div>

        {/*list of all rentals*/}
        <div className="tableBody">
            <h1>rentals</h1>
            <table>
                <tr className={"blue"}>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Annual price</th>
                    <th>Deposit</th>
                    <th>Contact Person</th>
                    <th>Edit rental</th>
                    <th>Delete</th>
                </tr>
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
                                    setChosenRental(data.id)
                                    setShowEdit(!showEdit)
                                }
                                }> edit rental
                                </button>
                            </td>
                            <td>
                                <button onClick={() => {
                                    rentalFacade.deleteRental(data.id).then(() => {
                                        setRefresh(!refresh)
                                    })
                                }
                                }>delete rental
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    </>)
}

export default AdminPanel
