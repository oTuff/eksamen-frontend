import apiFacade from "./apiFacade.js";
import {API_URL} from "../../settings.js";

function HomeFacade(){

    const getAllHomes = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("homes",updateAction,setErrorMessage)
    }

    return {
        getAllHomes
    }
}
const homeFacade = HomeFacade();
export default homeFacade;
