import React from "react";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Signin from "./Signin";
import Appbar from "./Appbar";

export default function Setting() {
  const token = localStorage.getItem("token");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [messsage, setMassage] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    fetch("http://localhost:3000/user/password", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        auth: "bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        setPassword(data);
      });
    });
  });
  return (
    <>
      {/* <Appbar></Appbar> */}
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h4>Change Password</h4>
          </div>
          <br />
          <div>{messsage}</div>
          <br />
          <TextField
            id="outlined-basic-username"
            label="Current Password"
            variant="outlined"
            fullWidth={true}
            type="password"
            value={password}
            readOnly={true}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic-username"
            label="New Password"
            variant="outlined"
            fullWidth={true}
            type="password"
            onChange={(e) => {
              setNewpassword(e.target.value);
              setMassage("");
            }}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic-username"
            label="Confirm Password"
            variant="outlined"
            fullWidth={true}
            type="password"
            onChange={(e) => {
              setConfirmpassword(e.target.value);
              setMassage("");
            }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            onClick={() => {
              if (newpassword != confirmpassword) {
                setMassage("new password and confirm password must be same");
              } else {
                const obj = {
                  method: "POST",
                  body: JSON.stringify({
                    password: newpassword,
                  }),
                  headers: {
                    "Content-type": "application/json",
                    auth: "bearer " + localStorage.getItem("token"),
                  },
                };
                fetch("http://localhost:3000/users/update", obj).then((res) => {
                  res.json().then((data) => {
                    if (data.message === "updated succesfully") {
                      console.log(data);
                      localStorage.setItem("token", data.token);
                      //   Navigate("/Signin");
                      window.location = "/";
                    } else {
                      setMassage(data.message);
                    }
                  });
                });
              }
            }}
          >
            Update
          </Button>
        </Card>
      </div>
    </>
  );
}
