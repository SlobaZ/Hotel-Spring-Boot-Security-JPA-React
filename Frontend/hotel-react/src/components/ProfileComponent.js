import React from "react";
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from "../services/AuthenticationService";

const Profile = () => {

  const currentUser = AuthenticationService.getCurrentUser();

  const[userReady,setUserReady] = useState(false);

  let navigate = useNavigate();


  useEffect(() => {

    if (!currentUser) {
      navigate("/"); 
    }
    else {
      setUserReady(true);
    }

  },[]); 

    return (
      <div className="container">
        {(userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> {" - "}  Profile page
          </h3>
        </header>

        <div className="tablemodel">
        <table className="x">
                <tr>
                    <td><strong>Token:</strong></td>
                    <td>
                        {currentUser.accessToken.substring(0, 20)} ...{" "}
                        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                    </td>
                </tr>
                <tr>
                    <td><strong>Id:</strong></td>
                    <td>{currentUser.id}</td>
                </tr>
                <tr>
                    <td><strong>Username:</strong></td>
                    <td>{currentUser.username}</td>
                </tr>
                <tr>
                    <td><strong>City:</strong></td>
                    <td>{currentUser.city}</td> 
                </tr>
                <tr>
                    <td><strong>Jmbg:</strong></td>
                    <td>{currentUser.jmbg}</td>
                </tr>
                <tr>
                    <td><strong>Phone:</strong></td>
                    <td>{currentUser.phone}</td>
                </tr>

                <tr>
                    <td><strong>Authorities: </strong> {" "}</td>
                    <td> 
                      <ul>
                      {currentUser.roles &&
                      currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                    </td>
                </tr>
        </table> 
        </div>
              <div className="empty"></div> 

      </div>
      : null}
      </div>

    );


};

export default Profile;



