import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import RoomService from '../../services/RoomService'
import AuthenticationService from "../../services/AuthenticationService";

const CreateReservation = () => {

    const[rooms,setRooms] = useState([]);

    let navigate = useNavigate();

    function refreshRooms () {
        const user = AuthenticationService.getCurrentUser();
         if (!user) {
             navigate('/login');
         }
         else {         
            RoomService.getAlls().then((response) => {
                    setRooms(response.data);
            });
        }
    }

    useEffect(() => {
		refreshRooms();
     },[]);


    const addReservation = (id) => {
           navigate(`/reserve/${id}` , {id});
    }


    return(

        <div>

        <div className="tablemodel">
                         
                <div class="rowModel">
                    <p>Rooms List</p>
                </div>

                <table>

                    <thead>
                        <tr>
                            <th> Name</th>
                            <th> Beds</th>
                            <th> Free </th>
                            <th> Actions</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map( room => 
                            <tr key = {room.id} >
                                <td data-label="Name"> {room.name} </td>   
                                <td data-label="Number of beds"> {room.numberOfBeds}</td>
                                {room.free ==="YES" &&
                                    <td data-label="Free">{room.free}</td>
								}
								{room.free ==="NO" &&
                                    <td data-label="Free" style={{color: "red"}} >{room.free}</td>
								}
                                <td data-label="Actions">
									{room.free ==="YES" &&
										<button className="btn btn-select" onClick={ () => addReservation(room.id)} > <i className='fas fa-plus'></i> Add Reservation </button>
									}
                                    {room.free ==="NO" &&
										<button className="btn btn-cancel" > <i class="fa fa-lock"></i> Occupied room </button>
									}
								</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                        <div className="empty"></div>
            </div>
        </div>
    )


}
export default CreateReservation;
