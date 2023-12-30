import React from 'react';
import {useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import logo from './logo.jpg'; 

import "./header.css";
import "./table.css";
import "./buttons.css";
import "./App.css";
import "./footer.css"; 

import AuthenticationService from "./services/AuthenticationService.js";
import DarkModeService from "./services/DarkModeService";

import Login from "./components/LoginComponent.js";
import Register from "./components/RegisterComponent.js";
import Home from "./components/HomeComponent.js";
import Profile from "./components/ProfileComponent.js";
import ListRooms from "./components/rooms/ListRoomsComponent.jsx";
import AddOrUpdateRoom from "./components/rooms/AddOrUpdateRoomComponent.jsx";
import ListUsers from "./components/users/ListUsersComponent.jsx";
import AddOrUpdateUser from "./components/users/AddOrUpdateUserComponent.jsx";
import ListReservations from "./components/reservations/ListReservationsComponent";
import AddOrUpdateReservation from "./components/reservations/AddOrUpdateReservationComponent";
import ListRoomsPrices from "./components/roomsprices/ListRoomsPricesComponent.jsx";
import CreateReservation from "./components/reserve/CreateReservation.jsx";
import Reserve from "./components/reserve/Reserve.jsx";
import ShowUsersCalculations from "./components/reserve/ShowUsersCalculations.jsx";

import RoomService from './services/RoomService';



function App() {  

  const[showMenu, setShowMenu] = useState(false);
	const[screenWidth, setScreenWidth] = useState(0);
	const[currentUser,setCurrentUser] = useState(null);
  const[showEmployeeAndAdmin,setShowEmployeeAndAdmin] = useState(false);


  
  useEffect(() => {   
    window.addEventListener('resize' , updateDimensions());
		setScreenWidth(window.innerWidth);
    refreshApp();
    checkFreeRoomsToday();
  },[]);


  function refreshApp() {
    const user = AuthenticationService.getCurrentUser();
		if (user) {
			setCurrentUser(user);
      setShowEmployeeAndAdmin(user.roles.includes("ROLE_EMPLOYEE") || user.roles.includes("ROLE_ADMIN"));
		}
    const mode = DarkModeService.getDarkMode();
    if(mode==="dark"){
      DarkModeService.addDarkMode();
    }
  }


  function checkFreeRoomsToday() {
    RoomService.checkFreeRoomsToday().then((response) => {
    })
    .catch((error) => {
        console.log('error: ' + error);
    }); 
  }

  function logOut () {
    AuthenticationService.logout();
    setCurrentUser(false);
    setShowEmployeeAndAdmin(false);
    window.location.reload(); 
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

  const addDarkMode = () => {
    DarkModeService.setDarkMode();
 }



   return (

    <div className="fullscreensize"> 

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

     <div className="screensize" >
    
     <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/roomsprices" element={<ListRoomsPrices/>} />
          <Route path="/rooms" element={<ListRooms/>} />
          <Route path="/addorupdate-room/:id" element={<AddOrUpdateRoom/>} /> 
          <Route path="/users" element={<ListUsers/>} />
          <Route path="/update-user/:id" element={<AddOrUpdateUser/>} />
          <Route path="/reservations" element={<ListReservations/>} />
          <Route path="/addorupdate-reservation/:id" element={<AddOrUpdateReservation/>} /> 
          <Route path="/createreservation" element={<CreateReservation/>} />
          <Route path="/reserve/:id" element={<Reserve/>} />
          <Route path="/showcalculate/:id" element={<ShowUsersCalculations/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
       </Routes>

      </div>

      <div className="footer">
        <div className="footerText">
            <p className="text-center">Hotel Spring Boot Security JPA React</p>
        </div>
        <div className="footerMode">
            <button className="btn btn-mode" onClick={ () => addDarkMode()}> Mode </button>
        </div>
        </div>
      

    </div>
  );



}


export default App;



