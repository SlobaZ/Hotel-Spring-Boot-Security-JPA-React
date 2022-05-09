import React, { Component } from 'react'
import UserService from '../../services/UserService'
import AuthService from "../../services/auth.service";


class ListUsersCalculationsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                users: [],
                searchUsername: '',
                searchJmbg: '',
                searchCity: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
       this.setState({[event.target.name]: event.target.value});  
    }
    
    handleSubmit(event) {
        event.preventDefault();  
        this.refreshUsers();
    }


    showCalculateUser(id){
        this.props.history.push(`/showcalculate/${id}`);
    }

    componentDidMount(){
		this.refreshUsers();
    }

    refreshUsers() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showAdmin: user.roles.includes("ROLE_ADMIN"),
        showEmployeeAndAdmin: user.roles.includes("ROLE_EMPLOYEE") || user.roles.includes("ROLE_ADMIN"),
      });
    }

        let config = { headers:{ Authorization: 'Bearer ' + user.accessToken } , params: {} };
        if (this.state.searchUsername !== "") {
          config.params.username = this.state.searchUsername;
        }
        if (this.state.searchJmbg !== "") {
          config.params.jmbg = this.state.searchJmbg;
        }
        if (this.state.searchCity !== "") {
            config.params.city = this.state.searchCity;
          }
        UserService.getUsers(config).then((response) => {
          this.setState({ users: response.data });
        });
      }


    render() {
     const {showEmployeeAndAdmin} = this.state;
        return (
           
            <div>
                <br/>
            
                 <div className="searchDiv">
                <form onSubmit={this.handleSubmit}>
                   
                    <div className="form-group">
                    <label className="form-control">  Username: 
                    <input type="text" name="searchUsername" value={this.state.searchUsername} onChange={this.handleChange}/>
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  JMBG: 
                    <input type="text" name="searchJmbg" value={this.state.searchJmbg} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  City: 
                    <input type="text" name="searchCity" value={this.state.searchCity} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Search" />
                    </div>

                </form>
                </div>
            
                <br/>  
                 <h2 className="text-center">User List</h2>

                 <br></br>
                {showEmployeeAndAdmin && ( 
                 <div className = "row">
                        <table className = "table table-striped table-bordered table-hover">

                            <thead>
                                <tr>
                                    <th> UserName</th>
                                    <th> City</th>
                                    <th> JMBG</th>
                                    <th> Phone</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.users.map(
                                        user => 
                                        <tr key = {user.id}>
                                             <td> {user.username} </td>  
                                             <td> {user.city}</td>
                                             <td> {user.jmbg}</td>
                                             <td> {user.phone}</td>
                                             <td>
                                                 <button onClick={ () => this.showCalculateUser(user.id)} className="btn btn-danger btn-lg">Calculate </button>
                                             </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
				<br/>
                 </div>
                  )}
            </div>
            
        )
    }
}

export default ListUsersCalculationsComponent
