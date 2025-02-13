import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';
import './login.css';

export function Login() {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault(); // Prevents form from refreshing the page
        navigate('/home'); // Navigates to the home page after login
    };

    return (
        <main>
            <h2>Login to Easy Trading</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <span>Email: </span>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <span>Password: </span>
                    <input type="password" id="password" name="password" required />
                </div>
                <div>
                    <button type="submit">Login</button> 
                    <button type="button" onClick={() => navigate('/register')}>Create</button>
                </div>
            </form>
        </main>
    );
}
