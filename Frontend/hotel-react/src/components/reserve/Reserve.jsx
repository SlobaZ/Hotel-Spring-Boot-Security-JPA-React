import React from 'react';
import {useState, useEffect, useMemo } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import RoomService from '../../services/RoomService';
import ReservationService from '../../services/ReservationService';
import AuthenticationService from "../../services/AuthenticationService";

const Reserve = () => {

    const {id} = useParams();

    const[name,setName] = useState('');
    const[numberOfBeds,setNumberOfBeds] = useState('');
	const[free,setFree] = useState('');
    const[user,setUser] = useState({});
    const[userId,setUserId] = useState('');
    const[roomId,setRoomId] = useState('');

    const[calendarEntry,setCalendarEntry] = useState('');
    const[calendarOutput,setCalendarOutput] = useState('');

    const dateTimeEntryS = useMemo(() => {
        return formatDateTimeToString(calendarEntry);
    }, [calendarEntry]);

    const dateTimeOutputS = useMemo(() => {
        return formatDateTimeToString(calendarOutput);
    }, [calendarOutput]);



    const [message, setMessage] = useState("");
	const [messageDateTimeEntryS, setMessageDateTimeEntryS] = useState("");
	const [messageDateTimeOutputS, setMessageDateTimeOutputS] = useState("");

    let navigate = useNavigate();


    function formatDateTimeToString  (value)  {
        const enteredValue = value;
        const day = enteredValue.substring(8, 10);
        const month = enteredValue.substring(5, 7);
        const year = enteredValue.substring(0, 4);
        const time = enteredValue.substring(11, 16);
        const formatedValue = day.concat(".", month, ".", year, ". ", time);
        return formatedValue;
    }


    const changeDateTimeEntrySHandler = (event) => {
        setCalendarEntry(event.target.value);
        setMessageDateTimeEntryS("");
        console.log(event.target.value);        
    }

    const changeDateTimeOutputSHandler = (event) => {
        setCalendarOutput(event.target.value);
        setMessageDateTimeOutputS("");
        
    }

    const cancel = () => {
        navigate('/createreservation');
    }

    const checkFields = () => {
        if(calendarEntry.trim().length === 0){
            setMessageDateTimeEntryS("The Entry Date and Time field must not be empty");
        }
        if(calendarOutput.trim().length === 0){
            setMessageDateTimeOutputS("The Output Date and Time field must not be empty");
        }
    }


    const saveReservation = (e) => {
        
        e.preventDefault();
		let reservation = { userId, roomId, dateTimeEntryS, dateTimeOutputS };                        
		console.log('reservation => ' + JSON.stringify(reservation));

        checkFields();

        if(calendarEntry && calendarOutput) {
            ReservationService.createReservation(reservation).then(response =>{
                    navigate(`/showcalculate/${userId}`);
            })
            .catch((error) => {
                console.log('error: ' + error);
                setMessage("Data entry failed"); 
            });
        }
        else {
            setMessage("Error: Check fields");
        }
    }


    useEffect(() => {
        const user = AuthenticationService.getCurrentUser();
		if (!user) {
            navigate('/login');
        }
        else {
             RoomService.getRoomById(id).then( (response) =>{
                setRoomId(response.data.id);
                setName(response.data.name);
                setNumberOfBeds(response.data.numberOfBeds);
                setFree(response.data.free);
            });
            setUserId(user.id);
            setUser(AuthenticationService.getCurrentUser());
		}
    },[]); 


    return (
        <div>
                {/*         xs < 576  ,            576 < sm > 768  ,      768 < md > 992 ,      992 < lg > 1200 ,    1200 < xl < 1400 ,    xxl > 1400px       */}
            <div className="col-xs-10 mx-xs-auto   col-sm-10 mx-sm-auto   col-md-8 mx-md-auto   col-lg-6 mx-lg-auto  col-xl-5 mx-xl-auto   col-xxl-4 mx-xl-auto"> 

                <div className="box">

                    <p className="createupdateP text-center">  Add Reservation </p>                  

                        <form>

                            <div className = "form-group">
                                <p className="mt-2"> User: <span className="ml-5"/> {user.username} </p>
                                <p className="mt-2"> Rooms: <span className="ml-4"/> {name} </p>
                                <p className="mt-2"> Beds: <span className="ml-5"/> {numberOfBeds} </p>
                                <p className="mt-2"> Free: <span className="ml-5"/> {free} </p>
                            </div>
                                   
                            <div className = "form-group">
                                <label className="mt-2"> Date and Time Entry: </label>
                                <input type="datetime-local"  className="form-control" value={calendarEntry} onChange={changeDateTimeEntrySHandler}/>
                                            {messageDateTimeEntryS && (
							                  <p className="messageP" > {messageDateTimeEntryS} ! </p>
							            	)} 
                            </div>       

                            <div className = "form-group">
                                <label className="mt-2"> Date and Time Output: </label>
                                <input type="datetime-local"  className="form-control" value={calendarOutput} onChange={changeDateTimeOutputSHandler}/>
                                            {messageDateTimeOutputS && (
							                  <p className="messageP" > {messageDateTimeOutputS} ! </p>
							            	)} 
                            </div>                            

                            <button className="btn btn-submit" onClick={saveReservation} > <i class='fas fa-sd-card'></i> Save </button>
                            <button className="btn btn-cancel" onClick={cancel} style={{marginLeft: "10px"}}> <i class='fas fa-undo-alt'></i> Cancel </button>

                                        {message && (
							              <div className="form-group">
							                  <p className="messageP" > {message} ! </p>
							              </div>
							            )}
                        </form>
                            
                </div>

            </div>
        </div>
    );

}

export default Reserve;
