import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate,useLocation} from "react-router-dom";
import { useFormInputValidation } from "react-form-input-validation";
import './Data.css';
const Data = () => {
    
    const { state } = useLocation();
    const prop1 = state?.id;
    const prop2 = state?.user_name;
    const prop3 = state?.mobile_no;
    console.log(prop1);
    console.log(prop2);
    console.log(prop3);
    const [data,setData] = useState(
        {
            id: prop1,
            user_name : prop2,
            mobile_no : prop3,
            
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
                //alert([data.user_name, data.mobile_no, data.id]);
                const res = await axios.post("http://localhost:3000/edit", data,{
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true});
                console.log(res);
                if(res.data==true)
                    navigate("/dashboard");
                else
                {
                    //console.log(res.data[0].err_ar);
                    for(let i =0;i<res.data[0].err_ar.length;i++)
                        {
                            for (const [key, value] of Object.entries(res.data[0].err_ar[i])) 
                                {
                                    console.log(key,value);
                                    document.getElementById(key).innerHTML = value;
                                }
                        }
                }
            }
            catch(err)
            {

            }
        }
  return (
    <div className='container'>
    <h1>EDIT</h1>
      <form onSubmit={handleClick}>
        <p>
        <label>user_name:</label>
          <input type = "text"  name='user_name' onChange={handleChange} defaultValue = {prop2}/>
        </p>
        <p>
        <label>mobile_no:</label>
          <input type = "text"  maxlength="10" name ='mobile_no' onChange={handleChange} defaultValue ={prop3}  />
          <label id="mobile_no"></label>
        </p>
          <button type="submit">APPLY</button>
      </form>
      
    </div>
  )
}

export default Data
