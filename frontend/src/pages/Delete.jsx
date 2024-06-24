import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './Detail.css'
import './Delete.css'


const Delete = ({id}) => {
    console.log("HELLo");
    const [data,setData] = useState(
        {
            c_id : "" 
        });
        const navigate = useNavigate();
        useEffect(() => {
            const deleteItem = async () => {
                setData(id);
                try {
                    await axios.post("http://localhost:3000/d",data);
                    navigate("/dashboard");
                } catch (err) {
                    console.log(err);
                }
            };
    
            deleteItem();
        }, [id, navigate]);
    
        /*
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
                navigate("/dashboard");
            }
            catch(err)
            {

            }
        }*/
  return (
    <div className='delete_container'>
    <h1>DELETE</h1>
      
      
    </div>
  )
}

export default Delete
