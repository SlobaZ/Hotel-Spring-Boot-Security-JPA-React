import React, { Component } from 'react'
import ReservationService from '../../services/ReservationService'
import AuthService from "../../services/auth.service";

class ListReservationsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                rooms: [],
                reservations: [],
				searchRoomId: '',
                searchCode: '',
                searchDateTimeEntryS: '',
                searchDateTimeOutputS: ''
        };
        
        this.addReservation = this.addReservation.bind(this);
        this.editReservation = this.editReservation.bind(this);
        this.deleteReservation = this.deleteReservation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
       this.setState({[event.target.name]: event.target.value});  
    }
    
    handleSubmit(event) {
        event.preventDefault();  
       this.refreshReservations();
    }

    deleteReservation(id){
        ReservationService.deleteReservation(id).then( response => {
            this.setState({reservations: this.state.reservations.filter(reservation => reservation.id !== id)});
        });
    }

    editReservation(id){
        this.props.history.push(`/addorupdate-reservation/${id}`);
    }

    componentDidMount(){
        this.refreshReservations();
    }

    refreshReservations() {
        const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showEmployeeAndAdmin: user.roles.includes("ROLE_EMPLOYEE") || user.roles.includes("ROLE_ADMIN"),
        showAdmin: user.roles.includes("ROLE_ADMIN"),
      });
    }
        let config = { headers:{ Authorization: 'Bearer ' + user.accessToken } , params: {} };
    
		if (this.state.searchRoomId  !== "") {
            config.params.roomId = this.state.searchRoomId;
          }
        if (this.state.searchCode !== "") {
          config.params.code = this.state.searchCode;
        }
        if (this.state.searchDateTimeEntryS  !== "") {
          config.params.dateTimeEntryS = this.state.searchDateTimeEntryS;
        }
		if (this.state.searchDateTimeOutputS  !== "") {
          config.params.dateTimeOutputS = this.state.searchDateTimeOutputS;
        }

        ReservationService.getRooms().then((response) => {
            this.setState({ rooms: response.data });
          });
        ReservationService.getReservations(config).then((response) => {
          this.setState({ reservations: response.data });
        });

      }

    addReservation(){
        this.props.history.push('/addorupdate-reservation/_add');
    }

    render() {
        const {showEmployeeAndAdmin} = this.state;
        const { showAdmin } = this.state;
        return (
            <div>
                <br/>
                
                 <div className="searchDiv">
                 <form onSubmit={this.handleSubmit}>

					<div className="form-group">
                    <label className="form-control">  Room: 
                    <select name="searchRoomId" value={this.state.searchRoomId} onChange={this.handleChange}> 
                            <option value={''}> --- Odaberi ---</option>  
                            {this.state.rooms.map(room => (
                            <option value={room.id}>{room.name}</option> ))}
                    </select>
                    </label>
                    </div>
                   
                    <div className="form-group">
                    <label className="form-control">  Code:
                    <input type="text" name="searchCode" value={this.state.searchCode} onChange={this.handleChange}/>
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  Date and time Entry: 
                    <input type="text" name="searchDateTimeEntryS" value={this.state.searchDateTimeEntryS} onChange={this.handleChange}/> 
                    </label>
                    </div>

					<div className="form-group">
                    <label className="form-control">  Date and time Output: 
                    <input type="text" name="searchDateTimeOutputS" value={this.state.searchDateTimeOutputS} onChange={this.handleChange}/> 
                    </label>
                    </div>

                   

                    <div className="form-group">
                    <input type="submit" value="Search" />
                    </div>
                </form>
                </div>
                
                 <br/>             
                 <h2 className="text-center">Reservations List</h2>

				<p>{}</p>

                 {showEmployeeAndAdmin && ( 
                 <div className="addButtonDiv">
                    <button className="btn btn-primary btn-block" onClick={this.addReservation}> Add Reservation</button>
                 </div>
                  )}
                 <br></br>
             
                 <div className = "row">
                        <table className = "table table-striped table-bordered table-hover">

                            <thead>
                                <tr>
                                    <th> ID</th>
                                    <th> Code</th>
                                    <th> Room </th>
									<th> Date Time Entry</th>
                                    <th> Date Time Output</th>
									<th> User </th>
                                    {showEmployeeAndAdmin && (    <th> Actions</th>  )}
                                </tr>
                            </thead>
                           
                            <tbody>
                            {
                                    this.state.reservations.map(
                                        reservation => 
                                        <tr key = {reservation.id}>
                                             <td> {reservation.id} </td> 
                                             <td> {reservation.code} </td>   
											 <td> {reservation.roomName} </td>   
                                             <td> {reservation.dateTimeEntryS}</td>
                                             <td> {reservation.dateTimeOutputS}</td>
											 <td> {reservation.userUsername} </td>
                                             {showEmployeeAndAdmin && ( 
											<td>
                                                 <button onClick={ () => this.editReservation(reservation.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteReservation(reservation.id)} className="btn btn-danger">Delete </button>
                                            </td>
                                             )}
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

export default ListReservationsComponent
