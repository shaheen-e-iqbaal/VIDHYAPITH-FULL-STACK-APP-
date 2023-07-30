
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const Navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirm_password, setConfirm_password] = useState("");
  const [message, setMassage] = useState("");
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
          Sign-up
        </h3>
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
          label="Email"
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
          label="Password"
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
        <TextField
          id="outlined-basic-confirm-password"
          label="confirm-password"
          variant="outlined"
          fullWidth={true}
          type="password"
          onChange={(e) => {
            setConfirm_password(e.target.value);
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
        <Button
          variant="contained"
          onClick={() => {
            if (Password === "" || Email === "" || Confirm_password === "") {
              setMassage("All feilds are required");
              return;
            }
            if (Password === Confirm_password) {
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
              fetch("http://localhost:3000/users/signup", obj).then((res) => {
                res.json().then((data) => {
                  if (data.message === "user created succesfully") {
                    localStorage.setItem("token", data.token);
                    window.location = "/home";
                  } else {
                    setMassage(data.message);
                  }
                });
              });
            } else {
              alert("password and confirm-password are not same");
            }
          }}
        >
          Sign-up
        </Button>
        {/* </div> */}
      </Card>
    </div>
  );
}

export default Signup;
