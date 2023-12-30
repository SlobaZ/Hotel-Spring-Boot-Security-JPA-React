import React from 'react';
import {useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import RoomService from '../../services/RoomService';

const AddOrUpdateRoom = () => {

    const {id} = useParams();

    const[name,setName] = useState('');
	const[numberOfBeds,setNumberOfBeds] = useState('');
	const[free,setFree] = useState('');
	
	const [message, setMessage] = useState("");
	const [messageName, setMessageName] = useState("");
	const [messageNumberOfBeds, setMessageNumberOfBeds] = useState("");
	const [messageFree, setMessageFree] = useState("");

    let navigate = useNavigate();

    const changeNameHandler = (event) => {
        setName(event.target.value);
        setMessageName("");
    }

    const changeNumberOfBedsHandler = (event) => {
        setNumberOfBeds(event.target.value);
        setMessageNumberOfBeds("");
    }

    const changeFreeHandler = (event) => {
        setFree(event.target.value);
        setMessageFree("");
    }

    const cancel = () => {
        navigate('/rooms');
    }

    const getTitle= () => {
        if(id === '_add'){
            return   <p className="createupdateP text-center">  Add Room </p>
        }else{
            return  <p className="createupdateP text-center">  Update Room </p>
        }
    }

    const checkFields = () => {
        if(name.trim().length === 0){
                setMessageName("The Name field must not be empty");
        }
        if(numberOfBeds === "" || numberOfBeds<=0){
                setMessageNumberOfBeds("The Number Of Beds field must be greater than zero");
        }
        if(free === "x" ){
            setMessageFree("The Free field must not be empty");
    }
}




const saveOrUpdateRoom = (e) => {
    
    e.preventDefault();
    let room = {name, numberOfBeds, free};                        
    console.log('room => ' + JSON.stringify(room));

    checkFields();
    
    if(name && numberOfBeds>0 && free!=="x") {
            if(id === '_add'){
                RoomService.createRoom(room).then( response => { 
                    navigate('/rooms');
                })
                .catch((error) => {
                    console.log('error: ' + error);
                    setMessage("Data entry failed"); 
                });
            }
            
            else {
                RoomService.updateRoom(id, room).then( response => { 
                    navigate('/rooms');
                })
                .catch((error) => {
                    console.log('error: ' + error);
                    setMessage("Data entry failed"); 
                });
            }
    }
    else {
        setMessage("Data entry failed");
    }
    
}



useEffect(() => {
    if(id === '_add'){
        return
    }
    else{
        RoomService.getRoomById(id).then( (response) =>{
            setName(response.data.name);
            setNumberOfBeds(response.data.numberOfBeds);
            setFree(response.data.free);
        });
    }    
},[]); 


return (
    <div>

            <div className="col-xs-10 mx-xs-auto   col-sm-10 mx-sm-auto   col-md-8 mx-md-auto   col-lg-6 mx-lg-auto  col-xl-5 mx-xl-auto"> 

                <div className="box">
                    {getTitle()} 
                    <form>
                        <div className="form-group">
                            <label className="mt-2">Name: </label>
                            <input type="text" className="form-control" placeholder="Enter name"  value={name} onChange={changeNameHandler} />
                                            {messageName && (
							                  <p className="messageP" > {messageName} ! </p>
							            	)}  
                        </div>
                    
                        <div className="form-group">
                            <label className="mt-2">Number of beds: </label>
                            <input type="number" className="form-control" placeholder="Number of beds"  value={numberOfBeds} onChange={changeNumberOfBedsHandler}/>  
                                            {messageNumberOfBeds && (
							                  <p className="messageP" > {messageNumberOfBeds} ! </p>
							            	)}  
                        </div>
                    
                        <div className="form-group">
                            <label className="mt-2">Free: </label>
                            <select  className="form-control" value={free} onChange={changeFreeHandler}>
	                                <option value={"x"}> --- Select ---</option>
	                                <option value={"YES"}> YES </option>
	                                <option value={"NO"}> NO </option>
                            </select>
                                           {messageFree && (
							                  <p className="messageP" > {messageFree} ! </p>
							            	)}      
                        </div>
                        
                        <div className="form-group">
                            <button className="btn btn-submit" onClick={saveOrUpdateRoom}> <i class='fas fa-sd-card'></i> Save</button>
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
export default AddOrUpdateRoom;
