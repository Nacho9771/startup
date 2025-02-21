import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';
import './login.css';

const AuthState = {
    Authenticated: 'Authenticated',
    Unauthenticated: 'Unauthenticated'
};

export function Login({ userName, authState, onAuthChange }) {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        if (email.trim() !== '') {
            onAuthChange(email, AuthState.Authenticated);
            navigate('/home');
        }
    };

    return (
        <main className='container-fluid bg-secondary text-center p-5'>
            {authState === AuthState.Authenticated ? (
                <div>
                    <h2>Welcome, {userName}!</h2>
                    <button onClick={() => onAuthChange('', AuthState.Unauthenticated)}>Logout</button>
                </div>
            ) : (
                <div>
                    <h2>Login to Easy Trading</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <span>Email: </span>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <span>Password: </span>
                            <input type='password' id='password' name='password' required />
                        </div>
                        <div>
                            <button type='submit'>Login</button>
                            <button type='button' onClick={() => navigate('/register')}>
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
}
