import { useState } from "react"
import { useEffect } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import SingleCourse from './SingleCourse';

export default function UserCourse(props){
    const Navigate = useNavigate();
    const purchasedcourses = props.purchasedcourses;
    const course = props.course;
    if(course != null){
    let present = false;
    for(let i = 0;i<purchasedcourses.length;i++){
      if(purchasedcourses[i] === 'null')continue;
        if(purchasedcourses[i] != null && purchasedcourses[i].courseId === course.courseId){
            present=true;
            break;
        }
    }
    return (
      <Card
        variant="outlined"
        style={{
          border: "1px solid black",
          width: "400px",
          //minWidth:"200px",
          //maxWidth:'250px',
          height: "auto",
          minHeight: "400px",
          //maxHeight:'400px',
          // marginTop:"100px",
          marginRight: "10px",
          // marginBottom: "15px",
          marginTop:'50px'
          // padding:'5px'
          //paddingBottom:'0px'
        }}
      >
        <div
          style={
            {
              // marginTop:'10px'
            }
          }
        >
          <img
            src={props.course.imageLink}
            alt=""
            style={{
              width: "400px",
              //minWidth:'200px',
              //maxWidth:'250px',
              height: "250px",
              //minHeight:'150px',
              //maxHeight:'400px'
            }}
          />
          <Typography textAlign={"center"} style={{ color: "green" }}>
            <Typography
              style={{
                color: "black",
                fontWeight: "bolder",
                marginTop: "10px",
              }}
            >
              {props.course.title}
            </Typography>
            {props.course.description}
            <br />
            <Typography
              style={{
                color: "black",
                fontWeight: "bolder",
              }}
            >
              $ {props.course.price}
            </Typography>

            <br />
            <Button variant="contained" style={{
                backgroundColor:present===true?'green':''
            }} onClick={()=>{
                if(!present){
                    Navigate('/singlecourse/' + course.courseId);
                }
            }}>{present===true?'Purchased':'Purchase'}</Button>
          </Typography>
        </div>
        <br />
        <br />
      </Card>
    );
}
}