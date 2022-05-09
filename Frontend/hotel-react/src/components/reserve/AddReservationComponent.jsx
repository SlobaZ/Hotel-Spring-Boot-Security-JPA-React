import React, { Component } from 'react'
import ReservationService from '../../services/ReservationService'
import RoomService from '../../services/RoomService'
import AuthService from "../../services/auth.service";

class AddReservationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            roomId: this.props.match.params.id,
			roomName: '',
			numberOfBeds: '',
            free: '',
            userId: '',
			dateTimeEntryS: '',
			dateTimeOutputS: '',
			user: { id: "" , username: "" },
			room : {}
			
        }

		this.changeDateTimeEntrySHandler = this.changeDateTimeEntrySHandler.bind(this);
		this.changeDateTimeOutputSHandler = this.changeDateTimeOutputSHandler.bind(this);
        this.saveReservation = this.saveReservation.bind(this);
    }


    componentDidMount(){
	    const user = AuthService.getCurrentUser();
		if (!user) {
            this.props.history.push('/login');
        }
        else{
            this.setState({
                user: AuthService.getCurrentUser()
              });
		}
	    this.setState({ user: user });
		this.setState({ roomId: this.props.match.params.id });
		RoomService.getRoomById(this.props.match.params.id).then( (res) =>{
                let room = res.data;
                this.setState({roomName: room.name,
                    numberOfBeds: room.numberOfBeds,
                    free: room.free
                });
            });
		
    }

	saveReservation = (e) => {
        e.preventDefault();
		let reservation = { userId: this.state.user.id , roomId: this.state.roomId , dateTimeEntryS: this.state.dateTimeEntryS, dateTimeOutputS: this.state.dateTimeOutputS };                        
		console.log('reservation => ' + JSON.stringify(reservation));
            ReservationService.createReservation(reservation).then(response =>{
				this.props.history.push(`/showcalculate/${this.state.user.id}`);
            });
    }
    

	changeDateTimeEntrySHandler= (event) => {
        this.setState({dateTimeEntryS: event.target.value});
    }
	changeDateTimeOutputSHandler= (event) => {
        this.setState({dateTimeOutputS: event.target.value});
    }

    cancel(){
        this.props.history.push('/');
    }


    render() {
        return (
            <div>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <br/>
								<h3 className="text-center">Add Reservation</h3>
								<br/>
								       <h4>Rooms: {this.state.roomName}</h4>                         
									<div className = "card-body">
                                    <form>
                                       
										<div className = "form-group">
                                            <label> Date and Time Entry: </label>
                                            <input placeholder="dateTimeEntryS" name="dateTimeEntryS" className="form-control" 
                                                value={this.state.dateTimeEntryS} onChange={this.changeDateTimeEntrySHandler}/>
                                        </div>       

										<div className = "form-group">
                                            <label> Date and Time Output: </label>
                                            <input placeholder="dateTimeOutputS" name="dateTimeOutputS" className="form-control" 
                                                value={this.state.dateTimeOutputS} onChange={this.changeDateTimeOutputSHandler}/>
                                        </div>                            

                                        <button className="btn btn-success" onClick={this.saveReservation} >Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default AddReservationComponent
