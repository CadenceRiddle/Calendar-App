import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                navigate('/home');
            } else {
                setError(data.message);
            }

        }catch{
            console.error(err);
            setError('Failed to connect to server')
        }
    }

    return (
        <div className='login-container'>
            <h2>Login</h2>
            {error && <p className='error'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username Here' required>
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