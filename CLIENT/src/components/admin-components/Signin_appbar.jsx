import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import { Typography, colors } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Appbar from '../user-components/Appbar';
import { useEffect } from 'react';
import Courses from './Courses';

function Signin_appbar(){
    const Navigate = useNavigate();
    const [content,setContent] = useState('');
    const [email,setEmail] = useState('');
    useEffect(()=>{
        fetch("https://vidhyapith-full-stack-app.vercel.app/admin/me", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            auth: "bearer " + localStorage.getItem("token"),
          },
        }).then((res) => {
          res.json().then((data) => {
            setEmail(data);
          });
        });
    },[])
    return <>
    
    <div style={{
        display:'flex',
        justifyContent:'space-between',
    }}>
        <div>
            <a href="/">
            <Typography>My App</Typography>
            </a>
        </div>
        <div style={{
            display:'flex',
            justifyContent:'right',
            
        }}>
            <div style={{
                paddingRight:'10px',
                marginTop:'7px',
                color:'green'
            }}>
                <Typography>{email}</Typography>
            </div>
            
            <div>
                
                <Button variant="contained" onClick={()=>{
                    Navigate('/');
                    localStorage.setItem('token','');
                    //window.location = '/signin';
                }}>Logout</Button>
                
            </div>
            
        </div>
    </div>
    <br />
    <br />
    <br />
    <div>{content}</div>
    <div>
    <ul>
        <Typography><li><a href="/Courses">Courses</a></li></Typography>
        
    </ul>
    </div>
    </>
}

export default Signin_appbar