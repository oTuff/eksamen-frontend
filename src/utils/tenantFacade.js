import apiFacade from "./apiFacade.js";
import {API_URL} from "../../settings.js";

function TenantFacade(){

    const getAllTenats = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("tenats",updateAction,setErrorMessage)
    }

    return {
        getAllTenats
    }
}
const tenatFacade = TenantFacade();
export default tenatFacade;
