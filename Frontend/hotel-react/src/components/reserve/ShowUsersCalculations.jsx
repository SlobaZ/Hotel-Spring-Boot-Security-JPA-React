import React from 'react';
import {useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import ReservationService from '../../services/ReservationService';
import AuthenticationService from "../../services/AuthenticationService";

const ShowUsersCalculations = () => {

    const {id} = useParams();

    const[guestId,setGuestId] = useState('');
    const[guestUsername,setGuestUsername] = useState('');
    const[roomId,setRoomId] = useState('');
    const[roomName,setRoomName] = useState('');
    const[enter,setEnter] = useState('');
    const[exit,setExit] = useState('');
    const[numberOfDays,setNumberOfDays] = useState('');
    const[price,setPrice] = useState('');

    const[showCurrentUser,setShowCurrentUser] = useState('');

    let navigate = useNavigate();

    useEffect(() => {

        const user = AuthenticationService.getCurrentUser();
		if (!user) {
            navigate('/login');
        }
        else {
			setShowCurrentUser(user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_EMPLOYEE") || user.roles.includes("ROLE_GUEST")); 
            ReservationService.guestData(id).then((response) => {
                     setGuestId(response.data[0]);
                     setGuestUsername(response.data[1]);
                     setRoomId(response.data[2]);
                     setRoomName(response.data[3]);
                     setEnter(response.data[4]);
                     setExit(response.data[5]);
                     setNumberOfDays(response.data[6]);
                     setPrice(response.data[7]);                 
         })
         .catch((error) => {
             navigate('/users');
         }); 
		} 
        
    },[]); 


    return (
           
        <div>
            

            {showCurrentUser && ( 

                <div className="tablemodel">
                                                
                <div class="rowModel">
                    <p>Calculation</p>
                </div>

                    <table>     
                    <tbody>
                        <tr> <td> <h6> ID Guest  </h6> </td> <td> <h6> {guestId} </h6> </td> </tr> 
                        <tr> <td> <h6>  Guest  </h6> </td> <td> <h6> {guestUsername} </h6> </td> </tr> 
                        <tr> <td> <h6>  ID Room  </h6> </td> <td> <h6> {roomId} </h6> </td>  </tr>
                        <tr> <td> <h6>  Room  </h6> </td> <td> <h6> {roomName} </h6> </td> </tr>
                        <tr> <td> <h6>  Enter  </h6> </td> <td> <h6> {enter} </h6> </td> </tr>
                        <tr> <td> <h6>  Exit  </h6> </td> <td> <h6> {exit} </h6> </td> </tr>
                        <tr> <td> <h6>  Days  </h6> </td> <td> <h6> {numberOfDays} </h6> </td> </tr>
                        <tr> <td> <h6>  Price  </h6> </td> <td> <h6> {price} </h6> </td> </tr>
                    </tbody> 
                    </table>

                    <div className="empty"></div>
             </div>
           )}    

        </div>
        
    )


}

export default ShowUsersCalculations;

