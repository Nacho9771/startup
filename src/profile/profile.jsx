import React from 'react';
import './profile.css';

export function Profile() {
  return (
    <main class="profile-container">
        <section id="profile-info" class="profile-section">
        <h2>Profile Information</h2>
        <p>Email: <span>[user.email@gmail.com]</span></p>
        <p>Balance: $<span>9500</span></p>
    
        <div>
            <h3>Petition for $500 Stimulus (If your balance is below $10,000)</h3>
            <button type="submit">Request Stimulus</button>
        </div>
        </section>
    
        <section id="account-settings" class="profile-section">
        <h2>Account Settings</h2>
        <form>
            <label>Change Email:</label>
            <input placeholder="Enter new email" />
            <button type="submit">Update Email</button>
    
            <br />
            <br />
            <br />
            
            <label for="dark-mode-toggle">Enable Dark Mode        <input type="checkbox" id="dark-mode-toggle"></label>
        </form>
        </section>
    
        <section id="transaction-history" class="profile-section">
        <h2>Personal Transaction History (Database to be used)</h2>
        <ul>
            <li>[User] purchased [number] of the stock [stock abbreviation] for [stock price].</li>
            <li>[User] purchased [number] of the stock [stock abbreviation] for [stock price].</li>
            <li>[User] purchased [number] of the stock [stock abbreviation] for [stock price].</li>
        </ul>
        </section>
    </main>
  );
}