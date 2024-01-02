import React from 'react'; 
import {useState, useEffect, useContext } from 'react';
import { Link, useNavigate  } from "react-router-dom";
import logo from '../logo.jpg'; 

import AuthenticationService from "../services/AuthenticationService.js";
import {UserContext} from '../services/UserContext';

const Header =()=> {

    const[user] = useContext(UserContext);

    let navigate = useNavigate();  

    const[showMenu, setShowMenu] = useState(false);
	  const[screenWidth, setScreenWidth] = useState(0);
	  const[currentUser,setCurrentUser] = useState(null);
    const[showEmployeeAndAdmin,setShowEmployeeAndAdmin] = useState(false);


  useEffect(() => {   
    window.addEventListener('resize' , updateDimensions());
	  setScreenWidth(window.innerWidth);  
    const loggedUser = AuthenticationService.getCurrentUser();    /* JSON.parse(user);  */
	  if (loggedUser) {
	      setCurrentUser(loggedUser);
        setShowEmployeeAndAdmin(loggedUser.roles.includes("ROLE_EMPLOYEE") || loggedUser.roles.includes("ROLE_ADMIN"));
	  }
  },[user]);


  function logOut() {
    AuthenticationService.logout();
    navigate(0);
  }


   const showNavigation  = (showMenu) => { 
    if(showMenu===false){
       setShowMenu(true);
    }
    else{
      setShowMenu(false);
    }
   }


  const updateDimensions = () => {
     setScreenWidth(window.innerWidth);
  }



 return (

    <div className="header">   

    <div className="headerLogo">
        <div className="headerLogoDiv">
            <img src={logo} alt="Logo" />
        </div>
    </div>

    <div className="headerText">
        <div className="headerTextDiv">
            <h1> <Link to={"/"}> <i class="fa fa-institution"></i> Hotel </Link> </h1>  
        </div>
    </div>


  <div className="navbar">
    <div  id="active"><p onClick={ () => showNavigation(showMenu)}> MENU <i className="fa fa-bars"></i> </p></div>
      { (showMenu || screenWidth > 767) && (
      <div className="menu">
      
      <div className="item"><p><Link to={"/roomsprices"}>  <i class="fa fa-money"></i>  Room Price </Link></p></div> 
      
      <div className="item"><p><Link to={"/rooms"}> <i class="fas fa-bed"></i> Rooms </Link></p></div> 

      <div className="item"><p><Link to={"/createreservation"}> <i class="fa fa-shopping-basket"></i> Reserve </Link></p></div> 

      { showEmployeeAndAdmin &&  (
      <div className="item"><p><Link to={"/users"}> <i class='fa fa-users'></i> Users </Link></p></div>
      )}

      { showEmployeeAndAdmin &&  (
      <div className="item"><p><Link to={"/reservations"}> <i class="fa fa-file-text"></i>  Reservations </Link></p></div>
      )}
      
      {currentUser ? (
      <div className="itemX">        
      <p><Link to={"/profile"}> <i class='fas fa-user-alt'></i> {currentUser.username} </Link></p>
      <p onClick={logOut}><Link to={"/"}> <i class="fas fa-sign-out-alt"></i> LogOut </Link></p>
      </div>
      ) : (
      <div className="itemX">
      <p><Link to={"/login"}> <i class="fas fa-sign-in-alt"></i> Login </Link></p>
      <p><Link to={"/register"}> <i class="fa fa-edit"></i> Sign Up </Link></p>
      </div>
      )}
      </div>
    )}
  </div>

  </div>  

 );

}

export default Header;