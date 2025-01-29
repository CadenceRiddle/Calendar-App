import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);  // Toggle between Login and Signup
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'login' : 'signup';
        const body = isLogin ? { username, password } : { username, password, age };

        try {
            const response = await fetch(`http://localhost:3001/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                if (isLogin) {
                    navigate('/home');
                } else {
                    setIsLogin(true);
                }
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to connect to the server');
        }
    };

    return (
        <div className="login-container">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div className="input-field">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {!isLogin && (
                    <div className="input-field">
                        <label>Age:</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter your age"
                        />
                    </div>
                )}

                <button type="submit">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>

            <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p>
        </div>
    );
};

export default Login;
