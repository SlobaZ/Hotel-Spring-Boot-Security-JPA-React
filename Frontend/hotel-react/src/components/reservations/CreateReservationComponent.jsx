import React, { Component } from 'react'
import ReservationService from '../../services/ReservationService';

class CreateReservationComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            userId: '',
            roomId: '',
			dateTimeEntryS: '',
			dateTimeOutputS: '',
            rooms: [],
            users: []
			
        }
        this.changeRoomIdHandler = this.changeRoomIdHandler.bind(this);
        this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
		this.changeDateTimeEntrySHandler = this.changeDateTimeEntrySHandler.bind(this);
		this.changeDateTimeOutputSHandler = this.changeDateTimeOutputSHandler.bind(this);
        this.saveOrUpdateReservation = this.saveOrUpdateReservation.bind(this);
    }


    componentDidMount(){
        ReservationService.getUsers().then((response) => {
            this.setState({ users: response.data });
          });
        ReservationService.getRooms().then((response) => {
            this.setState({ rooms: response.data });
          });
        if(this.state.id === '_add'){
            return
        }else{
            ReservationService.getReservationById(this.state.id).then( (res) =>{
                let reservation = res.data;
                this.setState({
                    userId: reservation.userId,
                    roomId: reservation.roomId,
					dateTimeEntryS: reservation.dateTimeEntryS,
					dateTimeOutputS: reservation.dateTimeOutputS
                });
            });
        }        
    }
    saveOrUpdateReservation = (e) => {
        e.preventDefault();
        let reservation = { userId: this.state.userId , roomId: this.state.roomId, dateTimeEntryS: this.state.dateTimeEntryS, dateTimeOutputS: this.state.dateTimeOutputS };                        
        console.log('reservation => ' + JSON.stringify(reservation));
        if(this.state.id === '_add'){
            ReservationService.createReservation(reservation).then(response =>{
                this.props.history.push('/reservations');
            });
        }else{
            ReservationService.updateReservation(reservation, this.state.id).then( response => {
                this.props.history.push('/reservations');
            });
        }
    }
    
    changeUserIdHandler= (event) => {
        this.setState({userId: event.target.value});
    }
    changeRoomIdHandler= (event) => {
        this.setState({roomId: event.target.value});
    }
	changeDateTimeEntrySHandler= (event) => {
        this.setState({dateTimeEntryS: event.target.value});
    }
	changeDateTimeOutputSHandler= (event) => {
        this.setState({dateTimeOutputS: event.target.value});
    }

    cancel(){
        this.props.history.push('/reservations');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Reservation</h3>
        }else{
            return <h3 className="text-center">Update Reservation</h3>
        }
    }
    render() {
        return (
            <div>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                       
                                        <div className="form-group">
                                        <label className="form-control">  User: 
                                        <select name="userId" value={this.state.userId} onChange={this.changeUserIdHandler}> 
                                            <option value={''}> --- Odaberi ---</option>  
                                            {this.state.users.map(user => (
                                            <option value={user.id}>{user.username}</option> ))}
                                        </select>
                                        </label>
                                        </div>  

										<div className="form-group">
                                        <label className="form-control">  Room: 
                                        <select name="roomId" value={this.state.roomId} onChange={this.changeRoomIdHandler}> 
                                            <option value={''}> --- Odaberi ---</option>  
                                            {this.state.rooms.map(room => (
                                            <option value={room.id}>{room.name}</option> ))}
                                        </select>
                                        </label>
                                        </div>   
		
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

                                        <button className="btn btn-success" onClick={this.saveOrUpdateReservation}>Save</button>
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

export default CreateReservationComponent
