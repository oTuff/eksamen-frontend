import apiFacade from "./apiFacade.js";
import {API_URL} from "../../settings.js";

function TenatFacade(){

    const getAllTenats = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("tenats",updateAction,setErrorMessage)
    }

    return {
        getAllTenats
    }
}
const tenatFacade = TenatFacade();
export default tenatFacade;
