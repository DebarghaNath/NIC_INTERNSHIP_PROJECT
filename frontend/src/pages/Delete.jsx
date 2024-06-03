import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './Detail.css'
import './Delete.css'


const Delete = () => {
    const [data,setData] = useState(
        {
            c_id : "" 
        });
        const navigate = useNavigate();
    const handleChange = (e)=>
        {
            setData((prev)=>({...prev,[e.target.name]:e.target.value}));
        };
    console.log(data);
    const handleClick = async (e)=>
        {
           
            e.preventDefault()
            try
            {
                await axios.post("http://localhost:3000/d", data);
                navigate("/c");
            }
            catch(err)
            {

            }
        }
  return (
    <div className='delete_container'>
    <h1>DELETE</h1>
      <form onSubmit={handleClick}>
          <input type = "text" placeholder='ID' name='c_id' onChange={handleChange} reqired/>
          <button type="submit">DELETE</button>
      </form>
      
    </div>
  )
}

export default Delete
