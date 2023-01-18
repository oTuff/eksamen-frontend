import {useEffect, useState} from 'react'
import Header from "./components/Header.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import userFacade from "./utils/userFacade.js";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import trainingFacade from "./utils/trainingFacade.js";
import facade from "./utils/rentalFacade.js"
import UserPanel from "./pages/UserPanel.jsx";
import Profile from "./pages/Profile.jsx";
import loginFacade from "./utils/loginFacade.js";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    //checks if therer is a jwt token and sets login state(fixes the problem where refreshing the page resets the loggedIn state)
    useEffect(() => {
        if(loginFacade.getToken()) {
            setLoggedIn(true);
        }}, []);

    return (
        <div className="App">
            <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
            <nav className="errormsg">{errorMessage}</nav>
            <Routes>
                <Route path="/" element={<Home userFacade={userFacade} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}/>
                <Route path="profile" element={<Profile setLoggedIn={setLoggedIn}/>}/>
                <Route path="signin" element={!loggedIn ? <SignIn setLoggedIn={setLoggedIn}/> : <Home loggedIn={loggedIn}/>}/>
                <Route path="signup" element={<SignUp setLoggedIn={setLoggedIn}/>}/>
                <Route path="userpanel" element={userFacade.hasUserAccess("user",loggedIn)&&<UserPanel/>}></Route>
                <Route path="admin-panel" element={userFacade.hasUserAccess('admin', loggedIn)&&<AdminPanel loggedIn={loggedIn} setErrorMessage={setErrorMessage}/>}/>
                <Route path="*" element={<h1>Page Not Found !!!!</h1>}/>
            </Routes>
        </div>
    )
}

export default App
