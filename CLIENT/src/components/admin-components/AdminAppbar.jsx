import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import React from "react";
import AdminSignup from "./AdminSignup";
import AdminSignin from "./AdminSignin";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Courses from "../admin-components/Courses";
import AdminSidebar from "./AdminSidebar";
import AdminFaltuContent from "./AdminFaltuContent";
import AdminSigninButton from "./AdminSigninButton";
import myImage from "./mypic.jpg";

function AdminAppbar() {
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [firstcontent, setFirstcontent] = useState(<div></div>);
  const [secondcontent, setSecondcontent] = useState(<div></div>);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const openSignIn = () => {
    setIsSignInOpen(true);
  };

  const closeSignIn = () => {
    setIsSignInOpen(false);
  };
  if (token === "") {
    useEffect(() => {
      setSecondcontent(<AdminSigninButton></AdminSigninButton>);
    }, []);
    return (
      <>
        <Content
          firstcontent={firstcontent}
          secondcontent={secondcontent}
        ></Content>
        {/* {isSignInOpen === true ? <Signin /> : "FALSE"} */}
      </>
    );
  } else {
    useEffect(() => {
      fetch("https://vidhyapith-full-stack-app.vercel.app/admin/me", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          auth: "bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        res.json().then((data) => {
          setEmail(data);
          console.log(data);
          setFirstcontent(
            <div
              style={{
                paddingRight: "25px",
                marginTop: "10px",
              }}
            >
              <Typography
                style={{
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {data}
              </Typography>
            </div>
          );
          // setSecondcontent(<div style={{
          //     paddingRight:'9px',

          // }}><Button variant='contained' onClick={()=>{
          //     localStorage.setItem('token','');
          //     window.location = '/';
          // }}>Log out</Button></div>)
        });
      });
    }, []);
    return (
      <>
        <div
          style={{
            position: "fixed",
            width: "100%",
            top: "0",
            left:'0',
          }}
        >
          <Content
            firstcontent={firstcontent}
            secondcontent={secondcontent}
          ></Content>
        </div>
      </>
    );
  }
}
function Content({ firstcontent, secondcontent }) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100%",
          top: "0",
          marginLeft: "1px",
          zIndex: "100",
        }}
        fullwidth={true}
      >
        <Card
          style={{
            borderBottom: "0.01px solid white",
            backgroundColor: "rgba(35, 46, 49, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              // backgroundColor: '#f0f0f0',
              paddingTop: "5px",
              height: "60px",
            }}
          >
            <div>
              <img
                src={myImage}
                alt=""
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  marginLeft: "20px",
                  marginTop: "2px",
                }}
              />
            </div>
            <div>
              <Typography
                style={{
                  fontWeight: "bolder",
                  color: "white",
                  marginTop: "7px",
                  marginLeft: "40px",
                }}
              >
                Welcome to the vidhyapith
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2.5px",
              }}
            >
              {firstcontent}
              {secondcontent}
            </div>
          </div>
        </Card>
      </div>
      <AdminSidebar></AdminSidebar>
    </>
  );
}

export default AdminAppbar;
