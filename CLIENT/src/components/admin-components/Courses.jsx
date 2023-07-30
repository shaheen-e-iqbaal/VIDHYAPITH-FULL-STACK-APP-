import { useState } from "react"
import { useEffect } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import AdminCourse from './AdminCourse'
import AdminAppbar from "./AdminAppbar";

function Courses(){
    const Navigate = useNavigate();
    const [courses,setCourses] = useState([]);
    const token = localStorage.getItem('token');
        useEffect(()=>{
        fetch('http://localhost:3000/admin/courses',{
            method:"GET",
            headers:{
                "Content-type":'application/json',
                'auth': 'bearer ' + localStorage.getItem('token')
            }
        }).then((res)=>{
            res.json().then((data)=>{
                console.log(data);
                setCourses(data);
            })
        })
    },[])
    return (
      <>
        {/* <AdminAppbar></AdminAppbar> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginLeft: "200px",
            marginTop: "70px",
            scrollBehavior:'smooth'
          }}
        >
          {courses.map((value) => {
            return <AdminCourse course={value} />;
          })}
        </div>
      </>
    );
    
    
    
    
}


export default Courses;

