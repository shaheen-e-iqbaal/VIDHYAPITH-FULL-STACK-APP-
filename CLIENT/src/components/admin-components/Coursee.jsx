import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import { Typography, breadcrumbsClasses, private_createTypography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';
import AdminAppbar from "./AdminAppbar";
import Alert from "@mui/material/Alert";


function Coursee () {
    const courseId = useParams();
    const [courses,setCourses] = useState([]);
    
    useEffect(()=>{
        fetch('http://localhost:3000/admin/courses',{
            method:"GET",
            headers:{
                "Content-type":'application/json',
                'auth': 'bearer ' + localStorage.getItem('token')
            }
        }).then((res)=>{
            res.json().then((data)=>{
                
                setCourses(data);
            })
        })
    },[])
    let course;

    for(let i=0;i<courses.length;i++){
        const obj = {
            courseId:courses[i].courseId
        }
        
        if(obj.courseId === courseId.courseId){
            course = courses[i];
            
            break;
        }
    }
    if(!course){
        return <div>
            Loading...
        </div>
    }
    //const [course1,setCourse1] = useState(course);
    //console.log(course1);
    return <>
    {/* <AdminAppbar></AdminAppbar> */}
    <div style={{
        display:"flex",
        justifyContent:"center",
        marginTop:'40px'
    }}>
    <Course courses={courses} courseId={courseId} />
    <Upadecourse course={course} setCourses={setCourses} courses={courses}/>
    </div>
    </>
}

function Course(props){
    const courseId = props.courseId;
    let course;
    for(let i=0;i<props.courses.length;i++){
        const obj = {
            courseId:props.courses[i].courseId
        }
        if(obj.courseId === courseId.courseId){
            course = props.courses[i];
            break;
        }
    }
    //console.log(courseId);
    //console.log(course.courseId);
    return <div>
        <Card variant='outlined' style={{
            border: "1px solid black",
            width:"200px",
            marginTop:"50px",
            marginRight:"50px",
            // padding:'5px'
            paddingBottom:'0px'
        }}>
            <div style={{
            // marginTop:'10px'
        }}>
            
            <img src={course.imageLink} alt="" style={{
                width:'200px'
            }}/>
            <Typography textAlign={"center"} style={{color:'green'}}>
            Title: {course.title}
            <br />
            Description: {course.description}
            <br />
            Price: {course.price}
            <br />
            Course ID: {course.courseId}
            </Typography>
            
            </div>
            
            <br />
            <br />
        </Card>
        </div>
}

function Upadecourse(props){
    //const [course,setCourse] = useState(props.course);
    const course = props.course;
    
    const [message,setMassage] = useState('');
    const [title,setTitle] = useState(course.title);
    const [description,setDescription] = useState(course.description);
    const [price,setPrice] = useState(course.price);
    const [imageLink,setImageLink] = useState(course.imageLink);
    const [courseId1,setCourseId1] = useState(course.courseId);
    const [published,setPublished] = useState(course.published);
    return <div style={{
        display:'flex',
        justifyContent:'center'
    }}>
       
        <Card variant='outlined' style={{
            border: "1px solid black",
            width:"500px",
            marginTop:"50px",
            padding:'10px',
        }}>
        <h3 style={{
            display:'flex',
            justifyContent:'center'
        }}>Update-Course</h3>
        <div style={{
            display:'flex',
            justifyContent:"center",
            color:'red'
        }}>{message}</div>
        <br />
    <TextField id="outlined-basic-coursename"  placeholder="title" variant="outlined" fullWidth={true} type='text' onChange={(e)=>{
        setTitle(e.target.value);
        setMassage('');
    }} value={title}  />
    <br />
    <br />
    <TextField id="outlined-basic-description" placeholder="description" variant="outlined" fullWidth={true} type='text' onChange={(e)=>{
        setDescription(e.target.value);
        setMassage('');
    }} value={description}/>
    <br />
    <br />
    <TextField id="outlined-basic-price" label="price" variant="outlined" fullWidth={true} type='number' onChange={(e)=>{
        setPrice(e.target.value);
        setMassage('');
    }} value={price}/>
    <br />
    <br />
    <TextField id="outlined-basic-price" label="Image link" variant="outlined" fullWidth={true} type='link' onChange={(e)=>{
        setImageLink((e.target.value));
        setMassage('');
    }} value={imageLink}/>
    {/* <br />
    <br /> */}
    {/* <TextField id="outlined-basic-price" label="ID" variant="outlined" fullWidth={true} type='string' onChange={(e)=>{
        setCourseId1((e.target.value));
        setMassage('');
    }}/> */}
    <br />
    <br />
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" value={published}>Published?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={published}
          label="Published"
          onChange={(e)=>{
            setPublished(e.target.value);
            setMassage('');
          }}
        >
          <MenuItem value={'YES'}>YES</MenuItem>
          <MenuItem value={'NO'}>NO</MenuItem>
        </Select>
      </FormControl>
    <br />
    <br />
    <br />
    <div style={{
        display:'flex',
        justifyContent:'left',
        paddingRight:"5px"
    }}>
    <Typography style={{
        paddingRight:"5px"
    }}>Select Image</Typography>
    <input type="file"
       id="avatar" name="Image"
       accept="image/png, image/jpeg" placeholder='Image'></input>
       </div>
    <br />
    <br />
   
    <Button variant="contained" onClick={()=>{
        if(title==='' || description==='' || price==='' || published===''){
            setMassage(<Alert severity="error">All feilds are required</Alert>);
            return ;
        }
        const obj = {
            method:"PUT",
            body:JSON.stringify({
                title,
                description,
                price,
                published,
                imageLink,
                courseId:course.courseId,
            }),
            headers:{
                "Content-type":'application/json',
                'auth':'Bearer ' + localStorage.getItem('token')
            }
        }
        //console.log(obj.body.image);
        fetch('http://localhost:3000/admin/courses/' + course.courseId,obj).then((res)=>{
            res.json().then((data)=>{
                setMassage(<Alert severity="error">
                      {data.message}
                    </Alert>);
                //console.log(data.message);
                if(data.message === 'course updated succesfully'){
                let courses = props.courses;
                let newcourse = obj.body;
                newcourse = JSON.parse(newcourse);
                let updatedcourses = [];
                for(let i=0;i<courses.length;i++){
                    if(course.courseId === courses[i].courseId){
                        courses[i].title = newcourse.title;
                        courses[i].description = newcourse.description;
                        courses[i].price = newcourse.price;
                        courses[i].published = newcourse.published;
                        courses[i].imageLink = newcourse.imageLink;
                        updatedcourses.push(courses[i]);
                    }
                    else{
                        updatedcourses.push(courses[i]);
                    }
                }
                props.setCourses(updatedcourses);
                setMassage(<Alert severity="success">{data.message}</Alert>);
                //props.setCourse(obj.body)
            }
            })
        })
    }} >update course</Button>
    {/* </div> */}
    </Card>
    </div>
}



export default Coursee