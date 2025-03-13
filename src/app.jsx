import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import './home/home.css';

import homeIcon from '../public/transparent_icon_home.png';
import profileIcon from '../public/transparent_icon_profile.png';
import forumIcon from '../public/transparent_icon_forum.png';
import educationIcon from '../public/transparent_icon_education.png';

import { Forum } from './forum/forum';
import { Learn } from './education/education';
import { Profile } from './profile/profile';
import { Login } from './login/login';
import { Home } from './home/home';
import { AuthState } from './authState';

export default function App() {
    const [authState, setAuthState] = useState(AuthState.None);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('userName');
        if (storedUser) {
            setAuthState(AuthState.Authenticated);
            setUserName(storedUser);
        } else {
            setAuthState(AuthState.Unauthenticated);
        }
    }, []);

    return (
        <BrowserRouter>
            <div className='body'>
                <header className='header'>
                    <h1>Easy Trading</h1>
                    <div id='picture' className='picture-box'>
                        <img width='200px' src='/big moneys.jpg' alt='Picture Here' />
                    </div>

                    <nav>
                        <ul className='nav'>
                            {authState === AuthState.Authenticated && (
                                <>
                                    <li className='nav-item'>
                                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/home'>
                                            <img src={homeIcon} alt='Home' width="35px" />
                                            <span>Home</span>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/forum'>
                                            <img src={forumIcon} alt='Forum' width="25px" />
                                            <span>Forum</span>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/education'>
                                            <img src={educationIcon} alt='Education' width="30px" />
                                            <span>Learn</span>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/profile'>
                                            <img src={profileIcon} alt='Profile' width="25px" />
                                            <span>Profile</span>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <button className='nav-link btn btn-link' onClick={() => setAuthState(AuthState.Unauthenticated)}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                        <hr />
                        <hr />
                    </nav>
                </header>

                <Routes>
                    <Route
                        path='/'
                        element={
                            <Login
                                userName={userName}
                                authState={authState}
                                onAuthChange={(userName, authState) => {
                                    setAuthState(authState);
                                    setUserName(userName);
                                }}
                            />
                        }
                    />
                    {authState === AuthState.Authenticated ? (
                        <>
                            <Route path='/home' element={<Home userName={userName}/>} />
                            <Route path='/forum' element={<Forum userName={userName}/>} />
                            <Route path='/education' element={<Learn />} />
                            <Route path='/profile' element={<Profile userName={userName} onLogout={logout_feature} />} />
                        </>
                    ) : (
                        <Route path='*' element={<RedirectToLogin />} />
                    )}
                </Routes>

                <footer className='bg-dark text-white-50 text-center p-3'>
                    <span className='text-reset'>Connor Gordon</span>
                    <br />
                    <a className='text-reset' href='https://github.com/Nacho9771/startup.git'>
                        My GitHub
                    </a>
                    <p>&copy; 2025 Easy Trading</p>
                </footer>
            </div>
        </BrowserRouter>
    );

    function logout_feature() {
        localStorage.removeItem('userName');
        setAuthState(AuthState.Unauthenticated);
        setUserName('');
    }
}

function RedirectToLogin() {
    const navigate = useNavigate();
    useEffect(() => {navigate('/');}, [navigate]);
    return null;
}
