import { useState } from "react"
import { useEffect } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import UserCourse from './UserCourse';
import Appbar from "./Appbar";

export default function UserAllCourses () {

    const [courses,setCourses] = useState([]);
    const [purchasedcourses,setPurchasedcourses] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/users/courses',{
            method:"GET",
            headers:{
                "Content-type":'application/json',
                'auth': 'bearer ' + localStorage.getItem('token')
            }
        }).then((res)=>{
            res.json().then((data)=>{
                //console.log(data);
                setCourses(data);
            })
        })
        fetch("http://localhost:3000/users/purchasedCourses", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            auth: "bearer " + localStorage.getItem("token"),
          },
        }).then((res) => {
          res.json().then((data) => {
            setPurchasedcourses(data);
          });
        });
    },[])
    return (
      <>
      {/* <Appbar></Appbar> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "50px",
            marginLeft:'280px'
          }}
        >
          {courses.map((value) => {
            return (
              <UserCourse course={value} purchasedcourses={purchasedcourses} />
            );
          })}
          
        </div>
      </>
    );

}

