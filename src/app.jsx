import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import './home/home.css';

import Home from './home/home';
import Login from './login/login';
import Forum from './forum/forum';
import Learn from './education/education';
import Profile from './profile/profile';

export default function App() {
    return (
        <BrowserRouter>
            <div className='body'>
                <header className='container-fluid'>
                    <nav className='navbar fixed-top navbar-dark bg-dark'>
                        <div className='navbar-brand'>Easy Trading</div>
                        <menu className='navbar-nav'>
                        <li className='nav-item'>
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/'>
                                    Login
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/home'>
                                    Home
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/forum'>
                                    Forum
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/education'>
                                    Learn
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/profile'>
                                    Profile
                                </NavLink>
                            </li>
                        </menu>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/home' element={<Home />} />
                    <Route path='/forum' element={<Forum />} />
                    <Route path='/education' element={<Learn />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='*' element={<NotFound />} />
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
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center p-5'>404: Page Not Found</main>;
}
