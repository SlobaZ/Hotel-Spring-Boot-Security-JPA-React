import React, { Component } from 'react'
import RoomService from '../../services/RoomService'
import AuthService from "../../services/auth.service";

class ListRoomsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                rooms: [],
                searchName: '',
                searchNumberOfBeds: '',
				searchFree: ''
                
        };
        
        this.addRoom = this.addRoom.bind(this);
        this.editRoom = this.editRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
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

    deleteRoom(id){
        RoomService.deleteRoom(id).then( response => {
            this.setState({rooms: this.state.rooms.filter(room => room.id !== id)});
        });
    }

    editRoom(id){
        this.props.history.push(`/addorupdate-room/${id}`);
    }

    componentDidMount(){
        this.refreshRooms();
    }

    refreshRooms() {
        const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showEmployee: user.roles.includes("ROLE_EMPLOYEE"),
        showAdmin: user.roles.includes("ROLE_ADMIN"),
      });
    }
        let config = { params: {} };
    
        if (this.state.searchName !== "") {
          config.params.name = this.state.searchName;
        }
        if (this.state.searchNumberOfBeds  !== "") {
          config.params.numberOfBeds = this.state.searchNumberOfBeds;
        }
 		if (this.state.searchFree  !== "") {
          config.params.free = this.state.searchFree;
        }

        RoomService.getRooms(config).then((response) => {
          this.setState({ rooms: response.data });
        });
      }

    addRoom(){
        this.props.history.push('/addorupdate-room/_add');
    }

    render() {
        const { showAdmin } = this.state;
        return (
            <div>
                <br/>
                
                 <div className="searchDiv">
                 <form onSubmit={this.handleSubmit}>
                   
                    <div className="form-group">
                    <label className="form-control">  Name: 
                    <input type="text" name="searchName" value={this.state.searchName} onChange={this.handleChange}/>
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  Number Of Beds: 
                    <input type="text" name="searchNumberOfBeds" value={this.state.searchNumberOfBeds} onChange={this.handleChange}/> 
                    </label>
                    </div>

 					<div className="form-group">
                    <label className="form-control">  Free: 
                    <input type="text" name="searchFree" value={this.state.searchFree} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Search" />
                    </div>
                </form>
                </div>
                
                <br/>  
                 <h2 className="text-center">Rooms List</h2>

                 {showAdmin && (
                 <div className="addButtonDiv">
                    <button className="btn btn-primary btn-block" onClick={this.addRoom}> Add Room</button>
                 </div>
                  )}
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered table-hover">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Number Of Beds</th>
                                    <th> Free </th>
                                    {showAdmin && (    <th> Actions</th>  )}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.rooms.map(
                                        room => 
                                 			<tr key = {room.id}>
                                             <td> {room.name} </td>   
                                             <td> {room.numberOfBeds}</td>
											{room.free ==="YES" &&
                                             <td>{room.free}</td>
											}
										     {room.free ==="NO" &&
                                             <td style={{color: "red"}} >{room.free}</td>
											}
                                             {showAdmin && ( 
                                             <td>
                                                 <button onClick={ () => this.editRoom(room.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteRoom(room.id)} className="btn btn-danger">Delete </button>
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

export default ListRoomsComponent
