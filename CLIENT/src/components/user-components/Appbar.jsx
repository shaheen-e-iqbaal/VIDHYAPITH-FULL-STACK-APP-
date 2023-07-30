import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Courses from '../admin-components/Courses';
import Sidebar from './Sidebar';
import FaltuContent from './FaltuContent';
import SigninButton from './SigninButton'
import myImage from './mypic.jpg'

function Appbar(){
    const Navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [content,setContent] = useState('');
    const [email,setEmail] = useState('');
    const [firstcontent,setFirstcontent] = useState(<div></div>);
    const [secondcontent,setSecondcontent] = useState(<div></div>);
    const [isSignInOpen, setIsSignInOpen] = useState(false);

    const openSignIn = () => {
      setIsSignInOpen(true);
    };

    const closeSignIn = () => {
      setIsSignInOpen(false);
    };
    if(token === '' || token === null || token === 'undefined'){
        useEffect(()=>{
            setFirstcontent(<SigninButton></SigninButton>);
        },[])
        return (
          <>
            <div>
              <Content
                firstcontent={firstcontent}
                secondcontent={secondcontent}
              ></Content>
              {/* {isSignInOpen === true ? <Signin /> : "FALSE"} */}
            </div>
          </>
        );
    }
    else{
        useEffect(()=>{
        fetch("https://vidhyapith-full-stack-app.vercel.app/users/me", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            auth: "bearer " + localStorage.getItem("token"),
          },
        }).then((res) => {
          res.json().then((data) => {
            setEmail(data);
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
    },[])
        return (
          <>
            <div>
              <Content
                firstcontent={firstcontent}
                secondcontent={secondcontent}
              ></Content>
            </div>
          </>
        );
    }
}
function Content ({firstcontent,secondcontent}){
    return (
      <>
        <div
          style={{
            position: "fixed",
            width: "100%",
            top: "0",
            left: "0",
            right: "0",
            zIndex: "100",
            borderBottom: "1px solid white",
          }}
          fullwidth={true}
        >
          <Card
            style={{
              //   border: "1px solid white",
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
                  alt="my_pic"
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
                    position:'fixed',
                  }}
                >
                  Welcome to the vidhyapith
                </Typography>
              </div>
              <div
                style={{
                //   display: "flex",
                //   justifyContent: "space-between",
                  marginTop: "2.5px",
                }}
              >
                {firstcontent}
              </div>
            </div>
          </Card>
        </div>
        <Sidebar></Sidebar>
      </>
    );
}






export default Appbar;
