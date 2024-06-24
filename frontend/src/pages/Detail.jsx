import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Detail=()=> {
    const [books, setBooks]= useState([]);
    useEffect(()=>{
      const fetchAllBooks= async ()=>{
          try{
            const res=await axios.get("http://localhost:3000/c");
            //const res=await axios.get("http://localhost/test/index.php");
            console.log(res)
            setBooks(res.data);
          }catch(err){
            //alert(1);
            console.log(err);
          }
      }
      fetchAllBooks()
    },[]);

    return (
        
      <div className='detail_container'>
        <h1>CUSTOMERS</h1>
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
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.customer_name}</td>
                  <td>{book.customer_mobile}</td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>  
      </div>
    );
};

export default Detail;
