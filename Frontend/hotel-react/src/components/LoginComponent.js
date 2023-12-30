import React from 'react';
import {useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import avataricon from '../avataricon.jpg';

import { useNavigate } from 'react-router-dom';

import AuthenticationService from "../services/AuthenticationService";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const Login = () => {

	  let navigate = useNavigate();

	  const form = useRef();
	  const checkBtn = useRef();
	
	  const [username, setUsername] = useState("");
	  const [password, setPassword] = useState("");
	  const [loading, setLoading] = useState(false);
	  const [message, setMessage] = useState("");


	const onChangeUsername = (e) => {
		const username = e.target.value;
		setUsername(username);
	};

	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};
	
	const handleLogin = (e) => {
		e.preventDefault();
		setMessage("");
		setLoading(true);
				
		form.current.validateAll();

		if (checkBtn.current.context._errors.length === 0) {
      AuthenticationService.login(username, password).then( 
			() => {
        navigate("/"); 
			  window.location.reload();  
			},
			(error) => {
			const resMessage =
				(error.response &&
				error.response.data &&
				error.response.data.message) ||
				error.message ||
				error.toString();

			setLoading(false);
			setMessage(resMessage);
        }
		);
		} else {
			setLoading(false);
		}
	};
	
	 return (
      <div>
        
            <div className="col-xs-10 mx-xs-auto   col-sm-10 mx-sm-auto   col-md-8 mx-md-auto   col-lg-6 mx-lg-auto  col-xl-3 mx-xl-auto">  

            <div className="box login-register">

            <img src={avataricon} alt="profile-img" />

            <Form  onSubmit={handleLogin} ref={form} >
            
                <div className="form-group">
                  <label className="mt-2">Username</label>
                  <Input type="text" className="form-control"  value={username} onChange={onChangeUsername} validations={[required]} />
                </div>

                <div className="form-group">
                  <label className="mt-2">Password</label>
                  <Input type="password" className="form-control" value={password} onChange={onChangePassword} validations={[required]} />
                </div>

                <div className="form-group">
                <br/>
                  <button className="btn btn-submit btn-block" disabled={loading} >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span> <i className="fas fa-sign-in-alt"></i> Login</span>
                  </button>
                </div>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
                
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
          </div>
          <div className="empty"></div>

      </div>

    );

};

export default Login;



