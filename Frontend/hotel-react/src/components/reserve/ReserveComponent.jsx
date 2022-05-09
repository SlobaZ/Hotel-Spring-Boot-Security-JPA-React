import React, { Component } from 'react'
import RoomService from '../../services/RoomService'
import AuthService from "../../services/auth.service";

class ReserveComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                rooms: []
                
        };
        
        this.addReservation = this.addReservation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
       this.setState({[event.target.name]: event.target.value});  
    }
    
    handleSubmit(event) {
        event.preventDefault();  
       this.refreshRooms();
    }

	addReservation(id){
        this.props.history.push(`/addreservation/${id}`);
    }


    componentDidMount(){
        this.refreshRooms();
    }

    refreshRooms() {
       const user = AuthService.getCurrentUser();
    	if (!user) {
            this.props.history.push('/login');
        }
        else{
            this.setState({
                user: AuthService.getCurrentUser()
              });
		}
        
        RoomService.getAlls().then((response) => {
          this.setState({ rooms: response.data });
        });
      }

    


    render() {
        return (
            <div>
                <br/>
                
                <br/>  
                 <h2 className="text-center">Rooms List</h2>

      
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered table-hover">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Beds</th>
                                    <th> Free </th>
                                    <th> Actions</th>  
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.rooms.map(
                                        room => 
                                        <tr key = {room.id} >
                                             <td> {room.name} </td>   
                                             <td> {room.numberOfBeds}</td>
                                             {room.free ==="YES" &&
                                             <td>{room.free}</td>
											}
										     {room.free ==="NO" &&
                                             <td style={{color: "red"}} >{room.free}</td>
											}
                                              <td>
												{room.free ==="YES" &&
												<button className="btn btn-primary" onClick={ () => this.addReservation(room.id)} className="btn btn-info">Add Reservation </button>
											 	}
											</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
                 <br/>
            </div>
        )
    }
}

export default ReserveComponent
