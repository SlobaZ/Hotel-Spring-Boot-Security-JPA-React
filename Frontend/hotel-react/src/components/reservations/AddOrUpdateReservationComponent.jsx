import React from 'react';
import {useState, useEffect, useMemo} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import ReservationService from '../../services/ReservationService';
import RoomService from '../../services/RoomService';

const AddOrUpdateReservation = () => { 
 
    const {id} = useParams();

    const[userId,setUserId] = useState('');
	const[roomId,setRoomId] = useState('');
    const[oldRoomId,setOldRoomId] = useState('');
    const[code,setCode] = useState('');

    const[users,setUsers] = useState([]);
    const[rooms,setRooms] = useState([]);
	
	const [message, setMessage] = useState("");
    const [messageUserId, setMessageUserId] = useState("");
    const [messageRoomId, setMessageRoomId] = useState("");
	const [messageDateTimeEntryS, setMessageDateTimeEntryS] = useState("");
	const [messageDateTimeOutputS, setMessageDateTimeOutputS] = useState("");

    const[calendarEntry,setCalendarEntry] = useState('');
    const[calendarOutput,setCalendarOutput] = useState('');

    const dateTimeEntryS = useMemo(() => {
        return formatDateTimeToString(calendarEntry);
    }, [calendarEntry]);

    const dateTimeOutputS = useMemo(() => {
        return formatDateTimeToString(calendarOutput);
    }, [calendarOutput]);


    let navigate = useNavigate();

    const changeUserIdHandler = (event) => {
        setUserId(event.target.value);
        setMessageUserId("");
    }

    const changeRoomIdHandler = (event) => {
        setRoomId(event.target.value);
        setMessageRoomId("");
    }

    const changeDateTimeEntrySHandler = (event) => {
        setCalendarEntry(event.target.value);
        setMessageDateTimeEntryS("");
    }

    const changeDateTimeOutputSHandler = (event) => {
        setCalendarOutput(event.target.value);
        setMessageDateTimeOutputS("");
    }

    const cancel = () => {
        navigate('/reservations');
    }

    const getTitle= () => {
        if(id === '_add'){
            return   <p className="createupdateP text-center">  Add Reservation </p>
        }else{
            return  <p className="createupdateP text-center">  Update Reservation </p>
        }
    }

    const checkFields = () => {
        if(userId === ""){
            setMessageUserId("The User field must not be empty");
        }
        if(roomId === ""){
            setMessageRoomId("The Room field must not be empty");
        }
        if(calendarEntry.trim().length === 0){
            setMessageDateTimeEntryS("The Entry Date and Time field must not be empty");
        }
        if(calendarOutput.trim().length === 0){
            setMessageDateTimeOutputS("The Output Date and Time field must not be empty");
        }

    }

    function formatDateTimeToString  (value)  {
        const enteredValue = value;
        const day = enteredValue.substring(8, 10);
        const month = enteredValue.substring(5, 7);
        const year = enteredValue.substring(0, 4);
        const time = enteredValue.substring(11, 16);
        const formatedValue = day.concat(".", month, ".", year, ". ", time);
        return formatedValue;
    }

    function formatStringToDateTime  (value)  {
        const enteredValue = value;
        const day = enteredValue.substring(0, 2);
        const month = enteredValue.substring(3, 5);
        const year = enteredValue.substring(6, 10);
        const time = enteredValue.substring(12, 17);
        const formatedValue = year.concat("-", month, "-", day, "T", time);
        return formatedValue;
    }



    const saveOrUpdateReservation = (e) => {

    e.preventDefault();

    let reservation = { userId , roomId, code, dateTimeEntryS, dateTimeOutputS };                        
    console.log('reservation => ' + JSON.stringify(reservation));
    

    checkFields();
    
        if(userId && roomId && calendarEntry && calendarOutput) {

            if(id === '_add'){
                ReservationService.createReservation(reservation).then( response => { 
                    navigate('/reservations');
                })
                .catch((error) => {
                    console.log('error: ' + error);
                    setMessage("Data entry failed"); 
                });
            }
            
            else {
                    if(oldRoomId!==roomId) {
                        RoomService.setAvailableRoomWhenUpdatingReservation(oldRoomId).then( response => { 
                            
                        })
                        .catch((error) => {
                            console.log('error: ' + error);
                            setMessage("Data entry failed"); 
                        });
                    }
                    ReservationService.updateReservation(id, reservation).then( response => { 
                        navigate('/reservations');
                    })
                    .catch((error) => {
                        console.log('error: ' + error);
                        setMessage("Data entry failed"); 
                    });
            }
        }
        else {
            setMessage("Error: check fields");
        }
    
    }



useEffect(() => {
    ReservationService.getUsers().then((response) => {
        setUsers(response.data);
      });
    ReservationService.getRooms().then((response) => {
        setRooms(response.data);
      });
    if(id === '_add'){
        return
    }
    else{
        ReservationService.getReservationById(id).then( (response) =>{
            setUserId(response.data.userId);
            setRoomId(response.data.roomId);
            setCode(response.data.code);
            setCalendarEntry(formatStringToDateTime(response.data.dateTimeEntryS));
            setCalendarOutput(formatStringToDateTime(response.data.dateTimeOutputS));
            setOldRoomId(response.data.roomId);
        });
    }    
},[]); 


return (
    <div>

            <div className="col-xs-10 mx-xs-auto   col-sm-10 mx-sm-auto   col-md-8 mx-md-auto   col-lg-5 mx-lg-auto  col-xl-4 mx-xl-auto"> 

                <div className="box">
                    {getTitle()} 
                    <form>

                        <div className="form-group">
                            <label className="mt-2">User: </label>
                            <select  className="form-control" value={userId} onChange={changeUserIdHandler}>
                                            <option value={''}> --- Select ---</option>  
                                            {users.map(user => (
                                            <option value={user.id}>{user.username}</option> ))}
                            </select>
                                           {messageUserId && (
							                  <p className="messageP" > {messageUserId} ! </p>
							            	)}      
                        </div>

                        <div className="form-group">
                            <label className="mt-2">Room: </label>
                            <select  className="form-control" value={roomId} onChange={changeRoomIdHandler}>
                                            <option value={''}> --- Select ---</option>  
                                            {rooms.map(room => (
                                            <option value={room.id}>{room.name}</option> ))}
                            </select>
                                           {messageRoomId && (
							                  <p className="messageP" > {messageRoomId} ! </p>
							            	)}      
                        </div>

                        <div className="form-group">
                            <label className="mt-2">Date and time Entry: </label>
                            <input type="datetime-local"  className="form-control"  value={calendarEntry} onChange={changeDateTimeEntrySHandler} />
                                            {messageDateTimeEntryS && (
							                  <p className="messageP" > {messageDateTimeEntryS} ! </p>
							            	)}  
                        </div>
                    
                        <div className="form-group">
                            <label className="mt-2">Date and time Output: </label>
                            <input type="datetime-local"  className="form-control" value={calendarOutput} onChange={changeDateTimeOutputSHandler}/>  
                                            {messageDateTimeOutputS && (
							                  <p className="messageP" > {messageDateTimeOutputS} ! </p>
							            	)}  
                        </div>
                    
                        
                        <div className="form-group">
                            <button className="btn btn-submit" onClick={saveOrUpdateReservation}> <i class='fas fa-sd-card'></i> Save</button>
                            <button className="btn btn-cancel" onClick={cancel}>  <i class='fas fa-undo-alt'></i> Cancel</button>
                        </div>

                                        {message && (
							              <div className="form-group">
							                  <p className="messageP" > {message} ! </p>
							              </div>
							            )}
                    </form>
                </div>
            </div> 
            <div className="empty"></div>                                   
    </div>
);

}
export default AddOrUpdateReservation;



