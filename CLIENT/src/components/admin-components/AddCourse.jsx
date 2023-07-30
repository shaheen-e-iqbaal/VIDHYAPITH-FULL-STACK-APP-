import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Navigate, useNavigate } from 'react-router-dom';
import AdminAppbar from './AdminAppbar';
import Alert from "@mui/material/Alert";



function AddCourse(){
    const Navigate = useNavigate();
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState(0);
    const [published,setPublished] = useState('YES');
    const [imageLink,setImageLink] = useState('');
    const [courseId,setCourseId] = useState('');
    const [message,setMassage] = useState('');

    return <>
    {/* <AdminAppbar></AdminAppbar> */}
     <div style={{
        display:'flex',
        justifyContent:'center'
    }}>
       
        <Card variant='outlined' style={{
            border: "1px solid black",
            width:"500px",
            marginTop:"90px",
            padding:'10px',
        }}>
        <h3 style={{
            display:'flex',
            justifyContent:'center'
        }}>Add-Course</h3>
        <div style={{
            display:'flex',
            justifyContent:"center",
            color:'red'
        }}>{message}</div>
        <br />
    <TextField id="outlined-basic-coursename" label="name" variant="outlined" fullWidth={true} type='text' onChange={(e)=>{
        setTitle(e.target.value);
        setMassage('');
    }}  />
    <br />
    <br />
    <TextField id="outlined-basic-description" label="description" variant="outlined" fullWidth={true} type='text' onChange={(e)=>{
        setDescription(e.target.value);
        setMassage('');
    }}/>
    <br />
    <br />
    <TextField id="outlined-basic-price" label="price" variant="outlined" fullWidth={true} type='number' onChange={(e)=>{
        setPrice(e.target.value);
        setMassage('');
    }}/>
    <br />
    <br />
    <TextField id="outlined-basic-price" label="Image link" variant="outlined" fullWidth={true} type='link' onChange={(e)=>{
        setImageLink((e.target.value));
        setMassage('');
    }}/>
    <br />
    <br />
    <TextField id="outlined-basic-price" label="ID" variant="outlined" fullWidth={true} type='string' onChange={(e)=>{
        setCourseId((e.target.value));
        setMassage('');
    }}/>
    <br />
    <br />
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Published?</InputLabel>
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
    {/* <br /> */}
    {/* <div style={{
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
       </div> */}
    {/* <br /> */}
    
   
    <Button variant="contained" onClick={()=>{
        if(title==='' || description==='' || price==='' || published===''){
            setMassage(<Alert severity="error">All Feilds are Required</Alert>);
            return ;
        }
        const obj = {
            method:"POST",
            body:JSON.stringify({
                title,
                description,
                price,
                published,
                imageLink,
                courseId
            }),
            headers:{
                "Content-type":'application/json',
                'auth':'Bearer ' + localStorage.getItem('token')
            }
        }
        console.log(obj.body.image);
        fetch(
          "https://vidhyapith-full-stack-app.vercel.app/admin/courses",
          obj
        ).then((res) => {
          res.json().then((data) => {
            if (
              data.message === "Course with this ID Exist" ||
              data.message === "Course with this Title and Description Exist"
            ) {
              setMassage(<Alert severity="error">{data.message}</Alert>);
            } else {
              setMassage(<Alert severity="success">{data.message}</Alert>);
            }
          });
        });
    }} >Add course</Button>
    {/* </div> */}
    </Card>
    <br />
    </div>
    </>



}

export default AddCourse