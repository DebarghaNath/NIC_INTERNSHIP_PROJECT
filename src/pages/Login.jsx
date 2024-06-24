import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
//import SHA512 from 'crypto-js/sha512';
import { sha512} from 'js-sha512';
//axios.defaults.withCredentials = true;
const Login = () => {
    const navigate = useNavigate();
    const [data,setData] = useState(
        {
            user_name : "",
            password : "" 

        });
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
                alert([data.user_name, data.password]);
                data.password = sha512(data.password).toString();
                const res = await axios.post("http://localhost:3000", data,{
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
               //const res1 = await axios.get("http://localhost:3000");
                //console.log(res1);
                console.log(res.data.length)
                if(res.data==2)
                    navigate("/dashboard");
                else if(res.data==1)
                {
                    alert("NOT VERIFIED USER");
                }
                else
                {
                    alert("SERVER ERROR");
                }
            }
            catch(err)
            {

            }
        }
        /*useEffect(()=>{
            const fetch= async ()=>{
                try{
                  const res=await axios.post("http://localhost:3000");
                  console.log(res)
                  //console.log("HELLO");
                }catch(err){
                  //alert(1);
                  console.log(err);
                }
            }
            fetch()
          },[]);*/
      
  return (
    <div className='welcome_container'>
    <h1>WELCOME</h1>
      <form onSubmit={handleClick} >
          <input type = "text" placeholder='user_name' name="user_name" onChange={handleChange}/>
          <input type = "password" placeholder='password' maxLength="10" name ="password" onChange={handleChange}/>
          <button type="submit">LOGIN</button>
          <div className='reg'>
            <label>
            dont have an account?
            </label>
            <Link to="/Register">Register</Link>
          </div>
      </form>
      
    </div>
  )
}

export default Login
