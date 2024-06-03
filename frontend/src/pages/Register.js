import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { sha512} from 'js-sha512';
import { useFormInputValidation } from "react-form-input-validation";


const Register = () => 
    {
        const [fields, errors, form] = useFormInputValidation(
            {
                name:"",
                mobile_no:"",
                email:"",
                user_name:"",
                password:"",
            },{
                name:"required",
                mobile_no:"required",
                email:"required",
                user_name:"required",
                password:"required",
            })
        const navigate = useNavigate();
        const [data,setData] = useState(
            {
                name:"",
                mobile_no:"",
                email:"",
                user_name:"",
                password:"",
            })
            
            
         const handleChange = (e)=>
        {
            setData((prev)=>({...prev,[e.target.name]:e.target.value}));
            console.log(data);
        };
        const handlesubmit = async (e)=>
        {
            e.preventDefault()
            try
            {
                console.log("HELLO");
                //const isValid = form.validate();
                //console.log(isValid)
                console.log(form.isValidForm)
                data.password = sha512(data.password).toString();
                const res = await axios.post("http://localhost:3000/Register",data,{
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                 });
                navigate("/");
            }
            catch
            {

            }

        }
  return (
    <div className='welcome_container'>
    <h1>REGISTER</h1>
      <form onSubmit={handlesubmit}>
        <input type = "text" placeholder='name' name="name" onChange={handleChange}  />

        <input type = "text" placeholder='mobile_no' maxLength="10" name ="mobile_no"onChange={handleChange}  />
        <input type = "text" placeholder='email'  name ="email" onChange={handleChange} />
        <input type = "text" placeholder='user_name'  name ="user_name" onChange={handleChange} />
        <input type = "text" placeholder='password' maxLength="10" name ="password" onChange={handleChange}/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Register
