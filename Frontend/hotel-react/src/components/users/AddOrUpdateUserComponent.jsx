import React from 'react';
import {useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import UsersService from '../../services/UserService';
import AuthenticationService from "../../services/AuthenticationService";

const AddOrUpdateUser = () => {

    const {id} = useParams();

    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[jmbg,setJmbg] = useState('');
    const[city,setCity] = useState('');
    const[phone, setPhone] = useState("");
    const[showEmployeeAndAdmin,setShowEmployeeAndAdmin] = useState('');
    
    const [message, setMessage] = useState("");
	const [messageUsername, setMessageUsername] = useState("");
	const [messagePassword, setMessagePassword] = useState("");
	const [messageJmbg, setMessageJmbg] = useState("");
    const [messageCity, setMessageCity] = useState("");
    const [messagePhone, setMessagePhone] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            setShowEmployeeAndAdmin(user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_EMPLOYEE"));
        }
            UsersService.getUserById(id).then( (response) =>{
                setUsername(response.data.username);
				setPassword(response.data.password);
				setJmbg(response.data.jmbg);
                setCity(response.data.city);
                setPhone(response.data.phone);
                console.log(response.data);
            });
    },[]);   


    const updateUser = (e) => {
		
        e.preventDefault();
        let user = {username, password, jmbg, city, phone};
        console.log('user => ' + JSON.stringify(user));
		
		checkFields();

		UsersService.updateUser(id, user).then( response => {
		        navigate("/users"); 
		},
		(error) => {
		    const resMessage =
		        (error.response &&
		        error.response.data &&
		        error.response.data.message) ||
		        error.message ||
		        error.toString();
		        setMessage(resMessage);
		});

    }
    
    const changeUsernameHandler = (event) => {
        setUsername(event.target.value);
        setMessageUsername("");
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
        setMessagePassword("");
    }

	const changeJmbgHandler = (event) => {
        setJmbg(event.target.value);
        setMessageJmbg("");
    }

    const changeCityHandler = (event) => {
        setCity(event.target.value);
        setMessageCity("");
    }

    const changePhoneHandler = (event) => {
        setPhone(event.target.value);
        setMessagePhone("");
    }

    const cancel = () => { 
        navigate("/users");  
    }
    
    
    const checkFields = () => {
			if(username.length < 5 || username.length > 100){
					setMessageUsername("The username must be between 5 and 100 characters");
			}
			if(password.length < 6 || password.length > 100){
					setMessagePassword("The password must be between 6 and 100 characters");
			}
			if(jmbg.length < 13 || jmbg.length > 13) {
					setMessageJmbg("The jmbg must be 13 characters");
			}
            if(city.trim().length === 0){
                setMessageCity("The City field must not be empty");
            }
            if(phone.length < 6 || phone.length > 10){
                setMessagePhone("The phone must be between 6 and 10 characters");
            }
	}

    return (
        <div>
            {showEmployeeAndAdmin && (
    
                <div className="col-xs-10 mx-xs-auto   col-sm-10 mx-sm-auto   col-md-8 mx-md-auto   col-lg-6 mx-lg-auto  col-xl-5 mx-xl-auto"> 
    
                    <div className="box">
                        
                        <form>
                            <div className="form-group">
                                <label className="mt-2">Username: </label>
                                <input type="text" className="form-control" placeholder="Enter username"  value={username} onChange={changeUsernameHandler} />
                                                {messageUsername && (
                                                  <p className="messageP" > {messageUsername} ! </p>
                                                )}  
                            </div>
                        
                            <div className="form-group">
                                <label className="mt-2">Password: </label>
                                <input type="text" className="form-control" placeholder="Enter password"  value={password} onChange={changePasswordHandler}/>  
                                                {messagePassword && (
                                                  <p className="messageP" > {messagePassword} ! </p>
                                                )}  
                            </div>

                            <div className="form-group">
                                <label className="mt-2">Jmbg: </label>
                                <input type="number" className="form-control" placeholder="Enter jmbg"  value={jmbg} onChange={changeJmbgHandler}/>  
                                                {messageJmbg && (
                                                  <p className="messageP" > {messageJmbg} ! </p>
                                                )}  
                            </div>

                            <div className="form-group">
                                <label className="mt-2">City: </label>
                                <input type="text" className="form-control" placeholder="Enter city"  value={city} onChange={changeCityHandler} />
                                                {messageCity && (
                                                  <p className="messageP" > {messageCity} ! </p>
                                                )}  
                            </div>

                            <div className="form-group">
                                <label className="mt-2">Phone: </label>
                                <input type="number" className="form-control" placeholder="Enter phone"  value={phone} onChange={changePhoneHandler}/>  
                                                {messagePhone && (
                                                  <p className="messageP" > {messagePhone} ! </p>
                                                )}  
                            </div>
                        
                                                        
                            <div className="form-group">
                                <button className="btn btn-submit" onClick={updateUser}> <i class='fas fa-sd-card'></i> Save</button>
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
            )} 
            <div className="empty"></div>                                   
        </div>
    );



}

export default AddOrUpdateUser;

