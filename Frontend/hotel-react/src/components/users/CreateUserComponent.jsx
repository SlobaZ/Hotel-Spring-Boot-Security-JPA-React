import React, { Component } from 'react'
import UserService from '../../services/UserService';
import AuthService from "../../services/auth.service";

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            username: '',
            password: '',
            city: '',
            jmbg: '',
            phone: ''
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeJmbgHandler = this.changeJmbgHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }


    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if (user) {
          this.setState({
            currentUser: user,
            showEmployeeAndAdmin: user.roles.includes("ROLE_EMPLOYEE") || user.roles.includes("ROLE_ADMIN"),
            showAdmin: user.roles.includes("ROLE_ADMIN"),
          });
        }
            UserService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({username: user.username,
                    password : user.password,
					city: user.city,
					jmbg: user.jmbg,
					phone: user.phone
                });
            });
        }        
   
    updateUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, password: this.state.password,city: this.state.city,jmbg: this.state.jmbg,phone: this.state.phone};
        console.log('user => ' + JSON.stringify(user));

            UserService.updateUser(user, this.state.id).then( res => {
                this.props.history.push('/users');
            });
       
    }
    
    changeUsernameHandler= (event) => {
        this.setState({username: event.target.value});
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

	changeCityHandler= (event) => {
        this.setState({city: event.target.value});
    }

    changeJmbgHandler= (event) => {
        this.setState({jmbg: event.target.value});
    }
    changePhoneHandler= (event) => {
        this.setState({phone: event.target.value});
    }
    

    cancel(){
        this.props.history.push('/users');
    }


    render() {
        const { showEmployeeAndAdmin , showAdmin } = this.state;
        return (
            <div>
                <br></br>
                {showEmployeeAndAdmin && (
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                    <h3 className="text-center">Update User</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Username: </label>
                                            <input placeholder="Username" name="username" className="form-control" 
                                                value={this.state.username} onChange={this.changeUsernameHandler}/>
                                        </div>
                                        {showAdmin && ( 
                                        <div className = "form-group">
                                            <label> Password: </label>
                                            <input placeholder="Password" name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
                                        </div>
                                        )}
                                        <div className = "form-group">
                                            <label> City: </label>
                                            <input placeholder="City" name="city" className="form-control" 
                                                value={this.state.city} onChange={this.changeCityHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> JMBG: </label>
                                            <input placeholder="Jmbg" name="jmbg" className="form-control" 
                                                value={this.state.jmbg} onChange={this.changeJmbgHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Phone: </label>
                                            <input placeholder="Phone" name="phone" className="form-control" 
                                                value={this.state.phone} onChange={this.changePhoneHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateUser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
                )}
            </div>
        )
    }
}

export default CreateUserComponent
