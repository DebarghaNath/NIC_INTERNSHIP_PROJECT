import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './Data.css';
const Data = () => {
    const [data,setData] = useState(
        {
            user_name : "",
            mobile_no : "" 

        });
        const navigate = useNavigate();
    const handleChange = (e)=>
        {
            setData((prev)=>({...prev,[e.target.name]:e.target.value}));
        };
    //console.log(data);
    const handleClick = async (e)=>
        {
           
            e.preventDefault()
            try
            {
                alert([data.user_name, data.mobile_no]);
                await axios.post("http://localhost:3000/l", data);
                navigate("/c");
            }
            catch(err)
            {

            }
        }
  return (
    <div className='container'>
    <h1>LOGIN</h1>
      <form onSubmit={handleClick}>
          <input type = "text" placeholder='user_name' name='user_name' onChange={handleChange} required/>
          <input type = "text" placeholder='mobile_no' maxlength="10" name ='mobile_no' onChange={handleChange} required/>
          <button type="submit">LOGIN</button>
      </form>
      
    </div>
  )
}

export default Data
