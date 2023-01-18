import apiFacade from "./apiFacade.js";
import {API_URL} from "../../settings.js";

function RentalFacade(){

    const getRentalsByTenant = (id) => {
        const options = apiFacade.makeOptions("GET",null,null);
        return fetch(API_URL+"/api/rentals/"+id,options)
            .then(apiFacade.handleHttpErrors)
    }

    return {
        getRentalsByTenant
    }
}
const rentalFacade = RentalFacade();
export default rentalFacade;
