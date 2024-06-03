import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Dashboard.css';

const Dashboard = () => 
  {
    const navigate = useNavigate();
    const [data, setData]= useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    useEffect(()=>{
      const fetchAllBooks= async ()=>{
          try{
            const res = await axios.get("http://localhost:3000/checkSession",{
              headers:{
                  'Content-Type': 'application/json'
              },
              withCredentials: true
          });
            console.log(res.data.isLoggedIn+' - '+res.data.user);
            setIsLoggedIn(res.data.isLoggedIn);
            console.log(res.data.isLoggedIn);
            if(res.data.isLoggedIn)
              {
                console.log("reached");
                const tab = await axios.get("http://localhost:3000/dashboard",{
                  headers:{
                      'Content-Type': 'application/json'
                  },
                  withCredentials: true
              });
                console.log(tab.data)
                setData(tab.data);
              }
  
          }catch(err){
            //alert(1);
            console.log(err);
          }
      }
      fetchAllBooks()
    },[]);
    const handleClick = async (e)=>
      {
        const val = await axios.get("http://localhost:3000/Logout",{
          headers:{
              'Content-Type': 'application/json'
          },
          withCredentials: true
      });
        console.log(val.data.success);
        console.log("hello");
        if(val.data.success)
          {
            console.log("hello");
            navigate("/");
          }
      }
    if (isLoggedIn === null)
       {
      return <div className='d'>UNAUTHORISED USER</div>;
    } 
    else if (!isLoggedIn) {
      return (
        <div className='d'>
          <h1>UNAUTHORISED USER</h1>
        </div>
      );
    } else {
      return (
        <div className='d'>
          <div>
            <h1>Welcome to the Dashboard</h1>
          </div>
          <div className='detail_table'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Customer Mobile</th>
              </tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.customer_name}</td>
                  <td>{d.customer_mobile}</td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>  
          <button className='btn' onClick={handleClick}>LOG OUT</button>
        </div>
        
      );
    }
  
}

export default Dashboard
