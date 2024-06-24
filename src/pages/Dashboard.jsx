import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import Delete from './Delete';
import Data from './Data';

import './Dashboard.css';

const Dashboard = () => 
  {
    const navigate = useNavigate();
    const [data, setData]= useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    //var isLoggedIn = null;
    const [id,setID] = useState(0);
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
            //console.log("hh");
            //isLoggedIn = res.data.isLoggedIn;
            console.log(res.data.isLoggedIn);
            //console.log("status = "+isLoggedIn)
            if(res.data.isLoggedIn)
              {
                setID(res.data.user);
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
    const handleDelete = async(id)=>
      {
      try {
        await axios.post("http://localhost:3000/d", { c_id: id });
        setData(data.filter(d => d.id !== id)); 
        console.log("HELLO");
      } catch (err) {
        console.log(err);
      }
    }
    const handleEdit = async(id)=>
      {
      try {
        //console.log(id);
        const res = await axios.post("http://localhost:3000/l",{id:id});
        //console.log(res.data[0]);
        navigate("/l",{ state: { id: res.data[0].id, user_name: res.data[0].customer_name, mobile_no:res.data[0].customer_mobile} });
      } catch (err) {
        console.log(err);
      }
    }

    if (isLoggedIn === null)
       {
        //alert(1)
      return <div className='d'>UNAUTHORISED USER</div>;
    } 
    else if (!isLoggedIn) {
      //alert(2)
      return (
        <div className='d'>
          <h1>UNAUTHORISED USER</h1>
        </div>
      );
    } else {
      //alert(3)
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.customer_name}</td>
                  <td>{d.customer_mobile}</td>
                  <td>
                    <button className='btn' onClick={()=>{handleEdit(d.id)}}>EDIT</button>&nbsp;
                    <button className='btn' onClick={()=>{handleDelete(d.id)}}>DELETE</button> 
                    </td>
                </tr>
                ))}
            </tbody>
          </table>
          <button className='btn' onClick={()=>
          {
            navigate("/add");
          }}>ADD</button>
        </div>  
        <div className='button'>
          <button className='btn' onClick={handleClick}>LOG OUT</button>
          
          </div>
      </div>
        
      );
    }
  
}

export default Dashboard
