import React from 'react';
import {useState, useEffect, useContext} from 'react';
import AuthenticationService from "../services/AuthenticationService";
import {UserContext} from '../services/UserContext';

const Home = () => { 

  const[user,setUser] = useContext(UserContext);

  const[currentUser,setCurrentUser] = useState(undefined);
	const[showAdmin,setShowAdmin] = useState(false);
  const[showEmployee,setShowEmployee] = useState(false);


  useEffect(() => {
    const loggedUser = AuthenticationService.getCurrentUser();    /* JSON.parse(user);  */
	  if (loggedUser) {
	      setCurrentUser(loggedUser);
        setShowAdmin(loggedUser.roles.includes("ROLE_ADMIN"));
        setShowEmployee(loggedUser.roles.includes("ROLE_EMPLOYEE"));
	  }
  },[user]);


  return (
    <div className="col-xs-10 mx-xs-auto   col-sm-10 mx-sm-auto ">  

      <div className="home-picture">
      
        <p>Home Page</p>


      {currentUser && (
            <p>GUEST</p>
          )}

      {showEmployee && (
          <p>EMPLOYEE</p>
      )}
 
      {showAdmin && (
            <p>ADMINISTRATOR</p>
          )}

      
     </div>
    </div>
  );


}

export default Home;





