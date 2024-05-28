import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import validationSignup from '../../components/ValidationLoginAndRegistration/signupValidation';
import "./signup.css"

function Signup() {

   const [values,setValues] = useState({
        name: '',
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
           setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }

    const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validationSignup(values));
    if(errors.name === "" && errors.email === "" && errors.password===""){
    
        axios.post('http://localhost:6969/signup', values)
        .then(res=>{
            navigate('/');
        })
        
        .catch(err => console.log(err))
    }
    
}

    return (

        <div className='containerSignUp'>
        <h1 className='mainNameCompany'>Nest_Bank <span className='aplicationName'>Pay Sprint</span></h1>
        <div className='signUpForm'>
            <h2 className='formHeading'>Sign-Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='formGroup'>
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input type="text" placeholder='Enter Name' name='name' onChange={handleChange}/>
                    {errors.name && <span className='error'>{errors.name}</span>}
                </div>
               
               <div className='formGroup'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email' onChange={handleChange}/>
                    {errors.email && <span className='error'>{errors.email}</span>}
               </div>
    
               <div className='formGroup'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password' onChange={handleChange}></input>
                    {errors.password && <span className='error'>{errors.password}</span>}
               </div>
               <button type="submit" className='signUpButton'>Sign Up</button>
               <Link to="/" className='loginLink'>Login</Link>            
            </form>
        </div>
    </div>
    
        
    )
}

export default Signup;