import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        //mock authentication, will replace with call
        if (email === 'test@example.com' && password === 'password123') {
            alert('login successful')
            navigate("/home");
        }
        else {
            setError('Invalid email or password')
        }
    }

    return (
        <div className='login-container'>
            <h2>Login</h2>
            {error && <p className='error'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email Here' required>
                    </input>
                </div>
                <div>
                    <label>Password:</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password Here' required>
                    </input>
                </div>
                <button type='submit'>Enter</button>
            </form>
        </div>
    );
};

export default Login;