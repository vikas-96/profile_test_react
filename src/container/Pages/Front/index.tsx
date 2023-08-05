import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button, TextField, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { signInApi } from '../../../api/User';
import SimpleReactValidator from 'simple-react-validator';
import { NotificationManager } from 'react-notifications';
import getValidationErrors from '../../../utils/getValidationErrors';
import initAxios from '../../../utils/initAxios';

const initialState = {
  email: "",
  password: ""
};

const Login: React.FC = () => {
  const [userData, setUserData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [, forceUpdate] = React.useState(0);
  const validator = React.useRef(new SimpleReactValidator());
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData(prev => ({...prev, [name]: value}));
  }

  const handleSubmit = (e) => {
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      forceUpdate(1);
      return false;
    }
    setIsLoading(true);
    signInApi(userData).then(resp => {
      localStorage.setItem(
        "userDetails",
        JSON.stringify({ token: resp.access_token })
      );
      initAxios();
      setIsLoading(false);
      navigate('/dashboard');
    }).catch(err => {
      setIsLoading(false);
      const message = getValidationErrors(err);
      NotificationManager.error(message, 'error', 3000);
    })
  };

  return (
    <div className="landing-page">
      <Typography variant="h6" component="h6">
        Sign In
      </Typography>
        <TextField
          id="email"
          label="Email"
          type="email"
          name="email"
          variant="standard"
          autoComplete='off'
          value={userData.email}
          onChange={handleChange}
        />
        {validator.current.message(
          'email',
          userData.email,
          'required|email',
        )}
        <TextField
          id="password"
          label="Password"
          type="password"
          name="password"
          variant="standard"
          autoComplete='off'
          value={userData.password}
          onChange={handleChange}
        />
        {validator.current.message(
          'password',
          userData.password,
          'required',
        )}
        <Typography variant="h6" component="h6" className='register-link'>
          <Link to="/register">
            Don't have an account? Sign Up
          </Link>
        </Typography>
        <Button 
          type="button" 
          color="primary" 
          className="form__custom-button"
          onClick={handleSubmit}  
          disabled={isLoading}
        >
          {!isLoading ? "Sign In" : "Loading..."}
        </Button>
    </div>
  );
};

export default Login;
