import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({ setLoginUser }) => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        let { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const login = () => {
        axios.post("http://localhost:6500/login", user)
            .then(res => {
                alert(res.data.message)
                setLoginUser(res.data.getEmail)
                navigate('/')
            })
        setUser({
            email: '',
            password: '',
        })
    }

    const registerRedirect = () => {
        navigate('/register')
    }

    return (
        <div className='login'>
            <h3>Login</h3>
            <input type='text' name="email" value={user.email} placeholder='Enter Your Email' onChange={handleChange} />
            <input type='password' name="password" value={user.password} placeholder='Enter Your Password' onChange={handleChange} />
            <div className='button' onClick={login}>Login</div>
            <div className='or'>or</div>
            <div className='button' onClick={registerRedirect}>Register</div>
        </div>
    )
}

export default Login