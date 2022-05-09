import React, { Component } from 'react'
import RoomService from '../../services/RoomService';

class CreateRoomComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            numberOfBeds: '',
            free: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeNumberOfBedsHandler = this.changeNumberOfBedsHandler.bind(this);
        this.changeFreeHandler = this.changeFreeHandler.bind(this);
        this.saveOrUpdateRoom = this.saveOrUpdateRoom.bind(this);
    }


    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            RoomService.getRoomById(this.state.id).then( (res) =>{
                let room = res.data;
                this.setState({name: room.name,
                    numberOfBeds: room.numberOfBeds,
                    free: room.free
                });
            });
        }        
    }
    saveOrUpdateRoom = (e) => {
        e.preventDefault();
        let room = {name: this.state.name, numberOfBeds: this.state.numberOfBeds, free: this.state.free};                        
        console.log('room => ' + JSON.stringify(room));
        if(this.state.id === '_add'){
            RoomService.createRoom(room).then(res =>{
                this.props.history.push('/rooms');
            });
        }else{
            RoomService.updateRoom(room, this.state.id).then( res => {
                this.props.history.push('/rooms');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeNumberOfBedsHandler= (event) => {
        this.setState({numberOfBeds: event.target.value});
    }

    changeFreeHandler= (event) => {
        this.setState({free: event.target.value});
    }



    cancel(){
        this.props.history.push('/rooms');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Room</h3>
        }else{
            return <h3 className="text-center">Update Room</h3>
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
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Number Of Beds: </label>
                                            <input placeholder="NumberOfBeds" name="numberOfBeds" className="form-control" 
                                                value={this.state.numberOfBeds} onChange={this.changeNumberOfBedsHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Free: </label>
                                            <input placeholder="Free" name="free" className="form-control" 
                                                value={this.state.free} onChange={this.changeFreeHandler}/>
                                        </div>    
                                        
                                        <button className="btn btn-success" onClick={this.saveOrUpdateRoom}>Save</button>
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

export default CreateRoomComponent
