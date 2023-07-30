import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signin_appbar from '../admin-components/Signin_appbar';
import Appbar from './Appbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SignupButton from './SignupButton'
import Alert from "@mui/material/Alert";

function Signin(){
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const Navigate = useNavigate();
    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const [message,setMassage] = useState('');
    const [role,setRole] = useState('users');
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          style={{
            border: "1px solid black",
            width: "500px",
            marginTop: "100px",
            padding: "10px",
          }}
        >
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Sign-in
          </h3>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "red",
            }}
          >
            {message}
          </div>
            <br />
          <TextField
            id="outlined-basic-username"
            label="username"
            variant="outlined"
            fullWidth={true}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setMassage("");
            }}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic-password"
            label="password"
            variant="outlined"
            fullWidth={true}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setMassage("");
            }}
          />
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "left",
              }}
            >
              <Checkbox {...label} />
              <Typography style={{ marginTop: "10px" }}>I am Human</Typography>
            </div>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "bottom",
                marginRight: "10px",
              }}
            >
              <Typography style={{ marginTop: "10px", paddingRight: "7px" }}>
                Don't have an account?
              </Typography>
              <SignupButton />
            </div>
          </div>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              const obj = {
                method: "POST",
                body: JSON.stringify({
                  username: Email,
                  password: Password,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              };
              const route =
                "https://vidhyapith-full-stack-app.vercel.app/" +
                role +
                "/login";
              console.log(role);
              fetch(route, obj).then((res) => {
                res.json().then((data) => {
                  if (
                    data.message === "Invalid credential" ||
                    data.message === "wrong input"
                  ) {
                    setMassage(<Alert severity="error">{data.message}</Alert>);
                  } else {
                    localStorage.setItem("token", data.token);
                    window.location = "/";
                  }
                });
              });
            }}
          >
            Sign-in
          </Button>
          {/* </div> */}
        </Card>
      </div>
    );
    
}

export default Signin