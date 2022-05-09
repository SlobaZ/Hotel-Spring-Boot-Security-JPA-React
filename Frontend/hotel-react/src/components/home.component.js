import React, { Component } from "react";

import AuthService from "../services/auth.service";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showEmployee: user.roles.includes("ROLE_EMPLOYEE"),
        showAdmin: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  render() {
    const { currentUser, showEmployee, showAdmin } = this.state;
    return (
      <div className="container">

        <br/>
        <div className="homeContainerPicture">
        
          <h2>Home Page</h2>
        
        <br/>
        <br/>

        {currentUser && (
              <h4>PASSENGER</h4>
            )}
        <br/>
        {showEmployee && (
       		 <h4>EMPLOYEE</h4>
        )}
        <br/>    
        {showAdmin && (
              <h4>ADMINISTRATOR</h4>
            )}
       </div>
      </div>
    );
  }
}


/*
<header className="jumbotron">
</header>

*/