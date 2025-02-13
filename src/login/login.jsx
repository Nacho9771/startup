import React from 'react';
import '../app.css';
import './login.css';

export function Login() {
  return (
    <main>
        <h2>Login to Easy Trading</h2>
        <form method="get" action="home.html">
            <div>
                <span>Email: </span>
                <input type="email" id="email" name="email" required />
            </div>
            <div>
                <span>Password: </span>
                <input type="password" id="password" name="password" required />
            </div>
            <div>
            <button type="submit">Login</button> <button type="submit">Create</button>
            </div>
        </form>
    </main>
  );
}