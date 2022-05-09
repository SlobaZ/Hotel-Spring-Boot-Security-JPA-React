import React, { Component } from "react";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from './logo.jpg';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import ListRoomsComponent from "./components/rooms/ListRoomsComponent.jsx";
import CreateRoomComponent from "./components/rooms/CreateRoomComponent.jsx";
import ListUsersComponent from "./components/users/ListUsersComponent.jsx";
import CreateUserComponent from "./components/users/CreateUserComponent.jsx";
import ListReservationsComponent from "./components/reservations/ListReservationsComponent";
import CreateReservationComponent from "./components/reservations/CreateReservationComponent";
import ListRoomsPricesComponent from "./components/roomsprices/ListRoomsPricesComponent.jsx";
import ReserveComponent from "./components/reserve/ReserveComponent";
import AddReservationComponent from "./components/reserve/AddReservationComponent";
import ListUsersCalculationsComponent from "./components/guestpricecalculation/ListUsersCalculationsComponent.jsx";
import ShowUsersCalculations from "./components/guestpricecalculation/ShowUsersCalculations.jsx";

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showEmployee: false,
      showPassenger: false,
      showAdmin: false,
      showEmployeeAndAdmin: false,
      currentUser: false,
    };
  }

  componentDidMount() {
  
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showGuest: user.roles.includes("ROLE_GUEST") ,
        showEmployeeAndAdmin: user.roles.includes("ROLE_EMPLOYEE") || user.roles.includes("ROLE_ADMIN"),

      });
    }
  }

  logOut() {
  AuthService.logout();
    this.setState({
      currentUser: false,
      showGuest: false,
      showEmployeeAndAdmin: false,
    });
  }

  render() {
    const { currentUser,  showEmployeeAndAdmin} = this.state;

    return (
      <div>      
      
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        
        <div className="logo">
        <img src={logo} width="50" height="50" alt="Logo" />
        </div>
        
          <Link to={"/"} className="navbar-brand">
            Hotel
          </Link>
          <div className="navbar-nav mr-auto ml-4">
          
          <li className="nav-item ml-3">
              <Link to={"/roomsprices"} className="nav-link">
                Room Price
              </Link>
            </li>
           
            <li className="nav-item ml-3">
              <Link to={"/rooms"} className="nav-link">
                Rooms
              </Link>
            </li>
            
            <li className="nav-item ml-3">
              <Link to={"/reserve"} className="nav-link">
                Reserve
              </Link>
            </li>

   
            { showEmployeeAndAdmin &&  (
              <li className="nav-item ml-3">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
            )}

            { showEmployeeAndAdmin &&  (
            <li className="nav-item ml-3">
              <Link to={"/reservations"} className="nav-link">
                Reservations
              </Link>
            </li>
            )}
            
            { showEmployeeAndAdmin &&  (
              <li className="nav-item ml-3">
                <Link to={"/calculation"} className="nav-link">
                  Calculation
                </Link>
              </li>
            )}


          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto mr-4">
             
              <li className="nav-item mr-4">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item mr-1">
                <a href="/" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto mr-4" >
              <li className="nav-item mr-4">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item mr-1">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

       <div className="container mt-3" >
       <HashRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/roomsprices" component={ListRoomsPricesComponent} />
            <Route path="/rooms" component={ListRoomsComponent} />
            <Route path="/addorupdate-room/:id" component={CreateRoomComponent} /> 
            <Route path="/users" component={ListUsersComponent} />
	        <Route path="/update-user/:id" component={CreateUserComponent} />
            <Route path="/reservations" component={ListReservationsComponent} />
            <Route path="/addorupdate-reservation/:id" component={CreateReservationComponent} /> 
            <Route path="/reserve" component={ReserveComponent} />
            <Route path="/addreservation/:id" component={AddReservationComponent} />
            <Route path="/calculation" component={ListUsersCalculationsComponent} />
            <Route path="/showcalculate/:id" component={ShowUsersCalculations} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
          </Switch>
         </HashRouter>
        </div>
      </div>
    );
  }
}

export default App;
