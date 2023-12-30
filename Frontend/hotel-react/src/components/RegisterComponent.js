import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import avataricon from '../avataricon.jpg';

import AuthenticationService from "../services/AuthenticationService";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 5 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 5 and 100 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 100 characters.
      </div>
    );
  }
};

const vcity = (value) => {
  if (value.length < 2 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The city must be between 2 and 40 characters.
      </div>
    );
  }
};


const vjmbg  = (value) => {
  if (value.length < 13 || value.length > 13) {
    return (
      <div className="alert alert-danger" role="alert">
        The jmbg must be 13 characters.
      </div>
    );
  }
};

const vphone = (value) => {
  if (value.length < 6 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        The phone must be between 6 and 10 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [phone, setPhone] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };


  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeCiity = (e) => {
    const city = e.target.value;
    setCity(city);
  };

  const onChangeJmbg = (e) => {
    const jmbg = e.target.value;
    setJmbg(jmbg);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthenticationService.register(username, password, city, jmbg, phone).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };


return (
      <div>
        
            <div className="col-xs-10 mx-xs-auto   col-sm-10 mx-sm-auto   col-md-8 mx-md-auto   col-lg-6 mx-lg-auto  col-xl-3 mx-xl-auto">
              <div className="box login-register">

              <img src={avataricon} alt="profile-img"  />

          <Form onSubmit={handleRegister} ref={form} >
            {!successful && (
              <div>
                <div className="form-group">
                  <label className="mt-2">Username</label>
                  <Input type="text" className="form-control" value={username} onChange={onChangeUsername} validations={[required, vusername]} />
                </div>

                <div className="form-group">
                  <label className="mt-1">Password</label>
                  <Input type="password" className="form-control" value={password} onChange={onChangePassword} validations={[required, vpassword]} />
                </div>

                <div className="form-group">
                  <label className="mt-1">City</label>
                  <Input type="text" className="form-control" value={city} onChange={onChangeCiity} validations={[required, vcity]} />
                </div>

                <div className="form-group">
                  <label className="mt-1">Jmbg</label>
                  <Input type="number" className="form-control" value={jmbg} onChange={onChangeJmbg} validations={[required, vjmbg]} />
                </div>

                <div className="form-group">
                  <label className="mt-1">Phone</label>
                  <Input type="number" className="form-control" value={phone} onChange={onChangePhone} validations={[required, vphone]} />
                </div>

                <div className="form-group">
                  <br/>
                  <button className="btn btn-submit btn-block"> <i className="fa fa-edit"></i> Sign Up</button>
                </div>
              </div>
            )}
			<br/>
            {message && (
              <div className="form-group">
                <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert" >
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

  export default Register;




