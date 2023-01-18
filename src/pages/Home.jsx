import React from 'react';
import "../styles/main.css";

function Home({loggedIn, setLoggedIn}) {

    return (
        <div>
            <div className="contentleft">
                <h2>About me</h2>
                <p>
                    Join me now, and let me help you!
                </p>
            </div>

            <div className="contentright">
                <h2>Contact</h2>
                <p><strong>Phone Number:</strong> <br/>29922992</p>
                <p><strong>Based in:</strong> <br/> Denmark</p>
                <p><strong>Location:</strong> <br/> Nørgaardsvej 30 - Kongens Lyngby, 2800</p>
            </div>
        </div>
    );
}

export default Home;