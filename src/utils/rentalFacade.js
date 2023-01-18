import apiFacade from "./apiFacade.js";
import {API_URL} from "../../settings.js";

function RentalFacade(){

    const getAllRentals = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("rentals",updateAction,setErrorMessage)
    }

    const getRentalsByTenant = (id) => {
        const options = apiFacade.makeOptions("GET",null,null);
        return fetch(API_URL+"/api/rentals/"+id,options)
            .then(apiFacade.handleHttpErrors)
    }

    const createRental = (rental) => {
        const options = apiFacade.makeOptions("POST", null, rental)
        return fetch(API_URL + "/api/rentals", options)
            .then(apiFacade.handleHttpErrors)
    }


    const deleteRental= (id) => {
        const options = apiFacade.makeOptions("DELETE", null,)
        return fetch(API_URL + "/api/rentals/"+id, options)
            .then(apiFacade.handleHttpErrors)
    }

    return {
        getAllRentals,
        getRentalsByTenant,
        createRental,
        deleteRental
    }
}
const rentalFacade = RentalFacade();
export default rentalFacade;
