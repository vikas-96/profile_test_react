import React, { useState } from 'react';
import './index.scss';
import { Button, TextField, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { signUpApi } from '../../../api/User';
import { NotificationManager } from 'react-notifications';
import getValidationErrors from '../../../utils/getValidationErrors';

const initialState = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register: React.FC = () => {
  const [userData, setUserData] = useState(initialState);
  const [, forceUpdate] = React.useState(0);
  const validator = React.useRef(new SimpleReactValidator());
  const navigate = useNavigate();

  const handleUserData = (e) => {
    const {name, value} = e.target;
    setUserData(prev => ({...prev, [name]: value}));
  }

  const handleSubmit = (e) => {
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      forceUpdate(1);
      return false;
    }
    signUpApi(userData).then(resp => {
      NotificationManager.success(resp.message, 'success', 2000);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }).catch(err => {
      const message = getValidationErrors(err);
      NotificationManager.error(message, 'error', 3000);
    })
  };

  return (
    <div className="landing-page">
      <Typography variant="h6" component="h6">
        Sign Up
      </Typography>
        <TextField
          id="name"
          label="Name"
          name="name"
          type="text"
          variant="standard"
          autoComplete='off'
          value={userData.name}
          onChange={handleUserData}
        />
        {validator.current.message(
          'name',
          userData.name,
          'required|alpha_space',
        )}
        <TextField
          id="email"
          label="Email"
          name="email"
          type="email"
          variant="standard"
          autoComplete='off'
          value={userData.email}
          onChange={handleUserData}
        />
        {validator.current.message(
          'email',
          userData.email,
          'required|email',
        )}
        <TextField
          id="password"
          label="Password"
          name="password"
          type="password"
          variant="standard"
          autoComplete='off'
          value={userData.password}
          onChange={handleUserData}
        />
        {validator.current.message(
          'password',
          userData.password,
          "required|min:8",
        )}
        <TextField
          id="confirm-password"
          label="Confirm Password"
          name="confirm_password"
          type="password"
          variant="standard"
          autoComplete='off'
          value={userData.confirm_password}
          onChange={handleUserData}
        />
        {validator.current.message(
          'confirm password',
          userData.confirm_password,
          'required',
        )}
        <Typography variant="h6" component="h6" className='register-link'>
          <Link to="/">
            Already have an account? Sign In
          </Link>
        </Typography>
        <Button 
          type="button" 
          color="primary" 
          className="form__custom-button" 
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
    </div>
  );
};

export default Register;
