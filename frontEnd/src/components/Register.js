import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        reEnterPassword: ''
    })
    const handleChange = (e) => {
        let { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const register = () => {
        const { name, email, password, reEnterPassword } = user;

        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:6500/register", user)
                .then(res => alert(res.data.message))
            navigate('/login')
        }
        else {
            alert("Invalid input")
        }
        setUser({
            name: '',
            email: '',
            password: '',
            reEnterPassword: ''
        })
    }
    const loginRedirect = () => {
        navigate('/login')
    }
    return (
        <div className='login register'>
            <h3>Register</h3>
            <input type='text' name="name" value={user.name} placeholder='Your Name' onChange={handleChange} />
            <input type='text' name="email" value={user.email} placeholder='Your Email' onChange={handleChange} />
            <input type='password' name="password" value={user.password} placeholder='Your Password' onChange={handleChange} />
            <input type='password' name="reEnterPassword" value={user.reEnterPassword} placeholder='Re-enter Password' onChange={handleChange} />
            <div className='button' onClick={register}>Register</div>
            <div className='or'>or</div>
            <div className='button' onClick={loginRedirect}>Login</div>
        </div>
    )
}

export default Register