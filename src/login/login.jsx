import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';
import './login.css';
import { AuthState } from '../authState';

export function Login({ userName, authState, onAuthChange }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleAuth(endpoint) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userName', data.email);
                onAuthChange(data.email, AuthState.Authenticated);
                navigate('/home');
            } else {
                const errMsg = await response.json();
                setError(`⚠ ${errMsg.msg}`);
            }
        } catch {
            setError('⚠ Network error. Please try again.');
        }
    }

    function handleLogout() {
        fetch('/api/auth/logout', { method: 'DELETE' })
            .finally(() => {
                localStorage.removeItem('userName');
                onAuthChange('', AuthState.Unauthenticated);
            });
    }

    return (
        <main className='container-fluid text-center p-5'>
            {authState === AuthState.Authenticated ? (
                <div>
                    <h2>Welcome, {userName}!</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h2>Login to Easy Trading</h2>
                    {error && <p className="error">{error}</p>}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAuth('/api/auth/login');
                        }}
                    >
                        <div>
                            <span>Email: </span>
                            <input
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <span>Password: </span>
                            <input
                                type='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button type='submit'>Login</button>
                            <button
                                type='button'
                                onClick={() => handleAuth('/api/auth/create')}
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
}