import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate,useLocation} from "react-router-dom";
import { useFormInputValidation } from "react-form-input-validation";

const Add = () => {
    const [fields, errors, form] = useFormInputValidation(
        {
           
            mobile_no:"",
            user_name:"",

        },{
            mobile_no:"required|regex:/^[0-9]{10}$",
            user_name:"required",//email
        })
    
        const navigate = useNavigate();
    //console.log(data);
    const handleClick = async (e)=>
        {
            const valid = await form.validate(e);
            console.log(valid);
            e.preventDefault()
            if(valid)
                {
                    try
                    {
                        //alert([data.user_name, data.mobile_no, data.id]);
                        const res = await axios.post("http://localhost:3000/add", fields,{
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true});
                        //console.log(res);
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
            else
            {
                console.log(fields,errors);
            }
        }
  return (
    <div className='container'>
    <h1>ADD</h1>
      <form onSubmit={handleClick}>
        <p>
        <label>user_name:</label>
          <input type = "text"  name='user_name' onBlur={form.handleBlurEvent}
            onChange={form.handleChangeEvent}  />
            <label>
            {errors.user_name
            ? errors.user_name
            : ""}
            </label>
        </p>
        <p>
        <label>mobile_no:</label>
          <input type = "text"  maxLength="10" name ='mobile_no' onBlur={form.handleBlurEvent}
            onChange={form.handleChangeEvent}   />
          <label id="mobile_no">
          {errors.mobile_no
            ? errors.mobile_no
            : ""}
          </label>
        </p>
          <button type="submit">LOGIN</button>
      </form>
      
    </div>
  )
}

export default Add

