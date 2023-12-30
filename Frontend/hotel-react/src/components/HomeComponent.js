import React from 'react';
import {useState, useEffect} from 'react';
import AuthenticationService from "../services/AuthenticationService";

const Home = () => { 


  const[currentUser,setCurrentUser] = useState(undefined);
	const[showAdmin,setShowAdmin] = useState(false);
  const[showEmployee,setShowEmployee] = useState(false);


  useEffect(() => {
    const user = AuthenticationService.getCurrentUser();
		if (user) {
			setCurrentUser(user);
			setShowAdmin(user.roles.includes("ROLE_ADMIN"));
      setShowEmployee(user.roles.includes("ROLE_EMPLOYEE"));
		}
  },[]);


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





