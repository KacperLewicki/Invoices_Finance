import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import validationLogin from '../../components/ValidationLoginAndRegistration/loginValidation'; 
import axios from 'axios';
import "./login.css";

function Login({onLogin}) {

const [values, setValues] = useState({

    email: '',
    password: '',    
})
const navigate = useNavigate();

const [errors, setErrors] = useState({})

const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
}

const handleSubmit = (e) => {

    e.preventDefault();

    setErrors(validationLogin(values));

if(errors.email === "" && errors.password === ""){

    axios.post('http://localhost:6969/login', values)

    .then( res => {

        if(res.data === "Success"){
            onLogin();
            navigate('/HomePage');

        } else {
            alert('No record existend');
        }
    })
    
    .catch(err => console.log(err));
}
}

return (
    <div className='containerLogin'>

    <h1 className='mainNameCompany'>Nest_Bank <span className='aplicationName'>Pay Sprint</span></h1>

    <div className='loginForm'>
        <form action='' onSubmit={handleSubmit}>
            <div className='formGroup'>
                <label htmlFor='email'><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name='email' onChange={handleInput}></input>
                {errors.email && <span className='error'>{errors.email}</span>}
            </div> 
            <div className='formGroup'>
                <label htmlFor='password'><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name='password' onChange={handleInput}></input>
                {errors.password && <span className='error'>{errors.password}</span>}
            </div>
            <button type='submit' className='loginButton'>Log in</button>

            <Link to='/Signup' className='signupLink'>Create Account</Link>
        </form>
    </div>
</div>

)
}

export default Login;
