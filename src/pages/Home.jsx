import React from 'react';
import "../styles/main.css";

function Home({loggedIn, setLoggedIn}) {

    return (
        <div className="tableBody">
            <h2>Home Page</h2>
            <table>
                <tr className={"blue"}>
                    <th>method</th>
                    <th>endpoint</th>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/api/rentals</td>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>api/rentals/houses</td>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/api/rentals/tenants/[id]</td>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/api/[id]</td>
                </tr>
                <tr>
                    <td>POST</td>
                    <td>api/rentals</td>
                </tr>
                <tr>
                    <td>PUT</td>
                    <td>api/rentals</td>
                </tr>
                <tr>
                    <td>DELETE</td>
                    <td>/api/rentals/[id]</td>
                </tr>


            </table>
        </div>
    );
}

export default Home;