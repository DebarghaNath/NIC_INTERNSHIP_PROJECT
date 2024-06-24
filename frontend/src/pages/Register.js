import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { sha512} from 'js-sha512';
import { useFormInputValidation } from "react-form-input-validation";


const Register = () => 
    {
        var dis;
        const [fields, errors, form] = useFormInputValidation(
            {
                name:"",
                mobile_no:"",
                email:"",
                user_name:"",
                password:"", 
            },{
                name:"required",
                mobile_no:"required|regex:/^[0-9]{10}$",
                email:"required",//email
                user_name:"required",//email
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
            
            
       
        const handlesubmit = async (e)=>
        {
            e.preventDefault()
            try
            {
                const isValid = await form.validate(e);
                if (isValid) 
                {
                    console.log(fields, errors);
                    fields.password = sha512(fields.password).toString();
                    const res = await axios.post("http://localhost:3000/Register",fields,{
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                    });
                    if(res.data==true)
                    {
                        navigate("/");
                    }
                    else
                    {
                        console.log(res.data[0].err_ar);
                        //res.data[0].err_ar.forEach(element => (key,value){
                        //       console.log(element);
                        //document.getElementById(element).innerHTML = res.data[0].err_ar[0].value
                        // });
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
                 else
                 {
                   console.log(fields, errors);
                 }
                //console.log("HELLO");
                //const isValid = form.validate();
                //console.log(isValid)
                //console.log(form.isValidForm)
                /*fields.password = sha512(fields.password).toString();
                const res = await axios.post("http://localhost:3000/Register",fields,{
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                 });
                 console.log(res.data[0].err_ar);
                 //res.data[0].err_ar.forEach(element => (key,value){
                 //       console.log(element);
                        //document.getElementById(element).innerHTML = res.data[0].err_ar[0].value
                // });
                for(let i =0;i<res.data[0].err_ar.length;i++)
                for (const [key, value] of Object.entries(res.data[0].err_ar[i])) {
                    console.log(key,value);
                    document.getElementById(key).innerHTML = value;
                  }
                    //document.getElementById("m_err").innerHTML = res.data[0].err_ar[0].mobile_no
                 
                 
                //navigate("/")*/
            }
            catch
            {

            }

        }
  return (
    <div className='welcome_container'>
    <h1>REGISTER</h1>
      <form onSubmit={handlesubmit} noValidate >
      <p>
        <label>
        Name:
            <input 
            type = "text" 
            placeholder='name' 
            name="name" 
            value = {fields.name}
            onBlur={form.handleBlurEvent}
            onChange={form.handleChangeEvent}   
             />
        </label>
        <label className="error" id='name'>
        {errors.name
          ? errors.name
          : ""}
          
        </label>
        </p>
        <p>
        <label>
        Mobile:
            <input 
            type = "text" 
            placeholder='mobile_no' 
            maxLength="10" 
            name ="mobile_no"
            value = {fields.mobile_no}
            onBlur={form.handleBlurEvent}
            onChange={form.handleChangeEvent}  
            />
        </label>
        <label className="error" id="mobile_no">
            {errors.mobile_no
            ? errors.mobile_no
            : ""}
        </label>
        </p>
        <p>
        <label>
        Email:
            <input 
            type = "text" 
            placeholder='email'  
            name ="email" 
            value = {fields.email}
            onBlur={form.handleBlurEvent}
            onChange={form.handleChangeEvent} 
            />
        </label>
        <label className="error" id='email'>
            {errors.email
            ? errors.email
            : ""}
        </label>
        </p>
        <p>
        <label>
        User_name:
            <input 
            type = "text" 
            placeholder='user_name' 
            name ="user_name" 
            value = {fields.user_name}
            onBlur={form.handleBlurEvent}
            onChange={form.handleChangeEvent} 
             />
        </label>
        <label className="error" id = "user_name">
            {errors.user_name
            ? errors.user_name
            : ""}
        </label>
        </p>
        <p>
        <label>
        Password:
            <input 
            type = "text" 
            placeholder='password' 
            maxLength="10" 
            name ="password" 
            value = {fields.password}
            onBlur={form.handleBlurEvent}
            onChange={form.handleChangeEvent}/>
        </label>
        <label className="error" id='password'>
            {errors.password
            ? errors.password
            : ""}
        </label>
        </p>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Register
