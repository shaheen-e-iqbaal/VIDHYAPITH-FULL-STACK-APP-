
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Appbar from "./Appbar";

export default function SingleCourse() {
  const courseId = useParams();
  const [courses,setCourses] = useState([]);
  const [course,setCourse] = useState({});
  const [isClicked,setIsClicked] = useState(false);
  const [text,setText] = useState('Purchase')
  useEffect(()=>{
    fetch("http://localhost:3000/users/courses", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        auth: "bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        //console.log(data);
        //setCourses(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].courseId === courseId.courseId) {
            setCourse(data[i]);
            break;
          }
        }
      });
    });
  },[])
  
//   useEffect(()=>{
//     for (let i = 0; i < courses.length; i++) {
//       if (courses[i].courseId === courseId.courseId) {
//         setCourse(courses[i]);
//       }
//     }
//   },[]);

  console.log(course);
  return (
    <>
      {/* 
       */}
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
          marginTop: "100px",
          marginRight: "5px",
          marginBottom: "15px",
          marginLeft: "390px",
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
            src={course.imageLink}
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
              {course.title}
            </Typography>
            {course.description}
            <br />
            <Typography
              style={{
                color: "black",
                fontWeight: "bolder",
              }}
            >
              $ {course.price}
            </Typography>
            <br />
            <Button
              variant="contained"
              onClick={() => {
                const obj = {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                    auth: "bearer " + localStorage.getItem("token"),
                  },
                };
                fetch(
                  "http://localhost:3000/users/courses/" + courseId.courseId,
                  obj
                ).then((res) => {
                  res.json().then((data) => {
                    setIsClicked(true);
                    setText("Purchased");
                  });
                });
              }}
              style={{
                backgroundColor: isClicked ? "green" : "",
              }}
            >
              {text}
            </Button>
          </Typography>
        </div>
        <br />
        <br />
      </Card>
    </>
  );
}
