import React, { useEffect, useState } from "react";
import '../Front/index.scss';
import { useNavigate } from "react-router-dom";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@material-ui/core";
import SimpleReactValidator from "simple-react-validator";
import { NotificationManager } from 'react-notifications';
import getValidationErrors from '../../../utils/getValidationErrors';
import { getUser, updateUser } from "../../../api/User";
import { getTokenDecodeValue } from "../../../utils/hepler";

const initialState = {
 age: null,
 gender: null,
 contact: null,
};

const Dashbaord = () => {
 const [isEdit, setIsEdit] = useState(false);
 const [userData, setUserData] = useState(initialState);
 const [, forceUpdate] = React.useState(0);
 const validator = React.useRef(new SimpleReactValidator());
 const navigate = useNavigate();
 const userDetail:any = getTokenDecodeValue();

 useEffect(() => {
  if(!userDetail){
    navigate('/');
    return;
  }
  getUser(userDetail.id ?? 1).then(resp => {
    const { data } = resp;
    setUserData({
      age: data.age,
      gender: data.gender,
      contact: data.contact,
    })
  }).catch(err => {
    const message = getValidationErrors(err);
    NotificationManager.error(message, 'Wrong', 3000);
  })
 },[]);

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
  updateUser(userData, userDetail.id).then(resp => {
    NotificationManager.success(resp.message, 'success', 2000);
    setIsEdit(false);
  }).catch(err => {
    const message = getValidationErrors(err);
    NotificationManager.error(message, 'error', 3000);
  })
};

const handleLogout = () => {
  localStorage.removeItem('userDetails');
  navigate('/');
}

 return(
  <>
  <div className="landing-page">
    {!isEdit && (
      <>
      <Typography variant="h6" component="h6">
        User Details
      </Typography>
      <Typography variant="subtitle2" gutterBottom className="Details">
        Age: {userData.age ?? "--"}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Gender: {userData.gender ?? "--"}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Mobile: {userData.contact ?? "--"}
      </Typography>
      <Button
        type="button" 
        color="primary" 
        className="form__custom-button" 
        onClick={() => setIsEdit(true)}
      >
        Edit
      </Button>
      </>
    )}
    {isEdit && (
      <>
        <Typography variant="h6" component="h6">
          Update Details
        </Typography>
        <TextField
          label="Age"
          name="age"
          type="text"
          variant="standard"
          autoComplete='off'
          value={userData.age}
          onChange={handleUserData}
        />
        {validator.current.message(
          'age',
          userData.age,
          'required|numeric',
        )}
        <FormControl>
          <FormLabel className="gender-label">Gender</FormLabel>
          <RadioGroup
            name="gender"
            className="gender-formgroup"
            value={userData.gender}
            onChange={handleUserData}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        {validator.current.message(
          'gender',
          userData.gender,
          'required',
        )}
        <TextField
          label="Mobile"
          name="contact"
          type="text"
          variant="standard"
          autoComplete='off'
          value={userData.contact}
          onChange={handleUserData}
        />
        {validator.current.message(
          'mobile',
          userData.contact,
          "required|min:10|max:10|numeric",
        )}
        <Button
          type="button" 
          color="primary" 
          className="form__custom-button" 
          onClick={handleSubmit}
        >
          Update Record
        </Button>
      </>
    )}
    <Button
      type="button" 
      variant="outlined"
      color="secondary"
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </Button>
   </div>
  </>
 );
}

export default Dashbaord;