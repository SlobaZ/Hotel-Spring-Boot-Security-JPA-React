import React, { Component } from 'react'
import UserService from '../../services/UserService'
import AuthService from "../../services/auth.service";


class ShowUsersCalculations extends Component {
    constructor(props) {
        super(props)

        this.state = {
				userId: this.props.match.params.id,
                dataguests: [],
				guestId: '',
				guestUsername: '',
				roomId: '',
				roomName: '',
				enter: '',
				exit: '',
				numberOfDays: '',
				price: ''	
        };
        
        
    }

  

    componentDidMount(){
     const user = AuthService.getCurrentUser();
		if (!user) {
            this.props.history.push('/login');
        }
        else{
            this.setState({
                user: AuthService.getCurrentUser(),
				showUser: user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_EMPLOYEE") || user.roles.includes("ROLE_GUEST"),
              });
		}
		this.setState({ userId: this.props.match.params.id });
 
        UserService.guestData(this.props.match.params.id).then((response) => {
           let dataguests = response.data;
				this.setState({
					guestId: dataguests[0],
					guestUsername: dataguests[1],
					roomId: dataguests[2],
					roomName: dataguests[3],
					enter: dataguests[4],
					exit: dataguests[5],
					numberOfDays: dataguests[6],
					price: dataguests[7] });
        });
			
		
      }


    render() {
	 const {showUser} = this.state;
        return (
           
            <div>
                <br/>
             	<br/>
                 <h2 className="text-center">Calculation</h2>

                 <br/>
				{showUser && ( 
                 <div className = "row">
                  <table className = "profiTable">      
                  <tr> <td> <h5> ID Guest  </h5> </td> <td> <h5> {this.state.guestId} </h5> </td> </tr> 
                  <tr> <td> <h5>  Guest  </h5> </td> <td> <h5> {this.state.guestUsername} </h5> </td> </tr> 
                  <tr> <td> <h5>  ID Room  </h5> </td> <td> <h5> {this.state.roomId} </h5> </td>  </tr>
                  <tr> <td> <h5>  Room  </h5> </td> <td> <h5> {this.state.roomName} </h5> </td> </tr>
                  <tr> <td> <h5>  Enter  </h5> </td> <td> <h5> {this.state.enter} </h5> </td> </tr>
				  <tr> <td> <h5>  Exit  </h5> </td> <td> <h5> {this.state.exit} </h5> </td> </tr>
				  <tr> <td> <h5>  Days  </h5> </td> <td> <h5> {this.state.numberOfDays} </h5> </td> </tr>
				  <tr> <td> <h5>  Price  </h5> </td> <td> <h5> {this.state.price} </h5> </td> </tr>
				  </table>
                 </div>
           	)}     
            </div>
            
        )
    }
}

export default ShowUsersCalculations
