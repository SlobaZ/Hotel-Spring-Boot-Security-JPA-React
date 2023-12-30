import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationService from '../../services/ReservationService';
import AuthenticationService from "../../services/AuthenticationService";

const ListReservations = () => {

    let navigate = useNavigate();
	
    const[showEmployeeAndAdmin,setShowEmployeeAndAdmin] = useState('');
    const[rooms,setRooms] = useState([]);
	const[reservations,setReservations] = useState([]);
	const[searchRoomId,setSearchRoomId] = useState('');
    const[searchCode,setSearchCode] = useState('');
    const[searchDateTimeEntryS,setSearchDateTimeEntryS] = useState('');
    const[searchDateTimeOutputS,setSearchDateTimeOutputS] = useState('');

    const handleChangeRoomId = (event) => {
        setSearchRoomId(event.target.value);
    }
	const handleChangeCode = (event) => {
        setSearchCode(event.target.value);
    }
	const handleChangeDateTimeEntryS = (event) => {
        setSearchDateTimeEntryS(event.target.value);
    }
    const handleChangeDateTimeOutputS = (event) => {
        setSearchDateTimeOutputS(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();  
        refreshReservations();
    }

    const addReservation = () => {
        navigate('/addorupdate-reservation/_add');
    }

    const editReservation  = (id) => {
        navigate(`/addorupdate-reservation/${id}` , {id});
    }

	const deleteReservation = (id) => {
        ReservationService.deleteReservation(id).then( response => {
            refreshReservations();
         });
    }

    function formatDateTime  (value)  {
        const enteredValue = value;
        const day = enteredValue.substring(8, 10);
        const month = enteredValue.substring(5, 7);
        const year = enteredValue.substring(0, 4);
        const time = enteredValue.substring(11, 16);
        const formatedValue = day.concat(".", month, ".", year, ". ", time);
        return formatedValue;
    }

    function refreshReservations () {
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            setShowEmployeeAndAdmin(user.roles.includes("ROLE_EMPLOYEE") || user.roles.includes("ROLE_ADMIN"));
          }
     
        let config = { headers:{ Authorization: 'Bearer ' + user.accessToken } , params: {} };
    
		if (searchRoomId  !== "") {
            config.params.roomId = searchRoomId;
          }
        if (searchCode !== "") {
          config.params.code = searchCode;
        }
        if (searchDateTimeEntryS  !== "") {
          config.params.dateTimeEntryS = formatDateTime(searchDateTimeEntryS);
        }
		if (searchDateTimeOutputS  !== "") {
          config.params.dateTimeOutputS = formatDateTime(searchDateTimeOutputS);
        }

        ReservationService.getRooms().then((response) => {
            setRooms(response.data);
          });
        ReservationService.getReservations(config).then((response) => {
            setReservations(response.data);
        });

      }

      useEffect(() => {
		refreshReservations();
     },[]);


     return (
        <div>
                <div className="box">
                <form className="form-inline" onSubmit={handleSubmit}>

                        <label className="mt-2 mt-sm-0 mr-2">Room: </label>
                        <select  className="form-control mr-4" value={searchRoomId} onChange={handleChangeRoomId}>
                            <option value={''}> --- Select ---</option>  
                            {rooms.map(room => (
                            <option value={room.id}>{room.name}</option> ))}
                        </select> 
                    
                        <label className="mt-2 mt-sm-0 mr-2">Code: </label>
                        <input type="text" className="form-control mr-4" placeholder="Enter Code"  value={searchCode} onChange={handleChangeCode} />

                        <label className="mt-2 mt-sm-0 mr-2">Date and time Entry &#10095; </label>
                        <input type="datetime-local"  className="form-control mr-4"  value={searchDateTimeEntryS} onChange={handleChangeDateTimeEntryS} />

                        <label className="mt-2 mt-sm-0 mr-2">Date and time Output &#10094; </label>
                        <input type="datetime-local" className="form-control mr-4" value={searchDateTimeOutputS} onChange={handleChangeDateTimeOutputS} />                        
                                            
                        <button type="submit" className="btn btn-search"> <i className='fa fa-search'></i> Search</button>
                    
                </form>
                </div>

                <div className="tablemodel">
                 				
                                 <div class="rowModel">
                                     <p>Reservations List</p>
                                     {showEmployeeAndAdmin && (
                                       <button className="btn btn-add" onClick={ addReservation }> <i class='fas fa-plus'></i> Add Reservation </button>
                                       )}
                                 </div>
               
                                       <table>
               
                                           <thead>
                                               <tr>
                                               <th> ID</th>
                                                <th> Code</th>
                                                <th> Room </th>
                                                <th> Date Time Entry</th>
                                                <th> Date Time Output</th>
                                                <th> User </th>
                                                   {showEmployeeAndAdmin && (    <th> Update </th> )}
                                                   {showEmployeeAndAdmin && (    <th> Delete </th> )}
                                               </tr>
                                           </thead>
                                           <tbody>
                                               { reservations.map( reservation => 
                                                    <tr key = {reservation.id}>
                                                        <td> {reservation.id} </td> 
                                                        <td> {reservation.code} </td>   
                                                        <td> {reservation.roomName} </td>   
                                                        <td> {reservation.dateTimeEntryS}</td>
                                                        <td> {reservation.dateTimeOutputS}</td>
                                                        <td> {reservation.userUsername} </td>
                                                            {showEmployeeAndAdmin && ( 
                                                            <td data-label="Update"> <button onClick={ () => editReservation(reservation.id)} className="btn btn-update"> <i className='fas fa-pencil-alt'></i> Update </button> </td>
                                                            )}   
                                                            {showEmployeeAndAdmin && ( 
                                                             <td data-label="Delete"> <button onClick={ () => deleteReservation(reservation.id)} className="btn btn-delete"> <i className='fas fa-trash-alt'></i> Delete </button> </td>
                                                            )}
                                                       </tr>
                                                   )
                                               }
                                           </tbody>
                                       </table>
                                       <div className="empty"></div>
                       </div>


        </div>
    )

}
export default ListReservations;
