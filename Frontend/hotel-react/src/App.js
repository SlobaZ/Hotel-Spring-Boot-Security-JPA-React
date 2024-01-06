import React from 'react'; 
import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


import "./header.css";
import "./table.css";
import "./buttons.css";
import "./App.css";
import "./footer.css"; 

import DarkModeService from "./services/DarkModeService";

import Header from './components/Header.js';
import Login from "./components/LoginComponent.js";
import Register from "./components/RegisterComponent.js";
import Home from "./components/HomeComponent.js";
import Profile from "./components/ProfileComponent.js";
import ListRooms from "./components/rooms/ListRoomsComponent.jsx";
import AddOrUpdateRoom from "./components/rooms/AddOrUpdateRoomComponent.jsx";
import ListUsers from "./components/users/ListUsersComponent.jsx";
import AddOrUpdateUser from "./components/users/AddOrUpdateUserComponent.jsx";
import ListReservations from "./components/reservations/ListReservationsComponent";
import ShowReservationCalculations from './components/reservations/ShowReservationCalculations.jsx';
import AddOrUpdateReservation from "./components/reservations/AddOrUpdateReservationComponent";
import ListRoomsPrices from "./components/roomsprices/ListRoomsPricesComponent.jsx";
import CreateReservation from "./components/reserve/CreateReservation.jsx";
import Reserve from "./components/reserve/Reserve.jsx";
import ShowUsersCalculations from "./components/reserve/ShowUsersCalculations.jsx";

import RoomService from './services/RoomService';



function App() {  


  useEffect(() => {   
    refreshApp();
    checkFreeRoomsToday();
  },[]);


  function refreshApp() {
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


  const addDarkMode = () => {
    DarkModeService.setDarkMode();
 }



   return (

    <div className="fullscreensize"> 
    
    <Header />

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
          <Route path="/resultreservation/:id" element={<ShowReservationCalculations/>} />
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



