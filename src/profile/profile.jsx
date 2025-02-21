import React from 'react';
import '../app.css';
import './profile.css';

export function Profile({ userName }) {
  return (
    <main className="profile-container">
      <section id="profile-info" className="profile-section">
        <h2>Profile Information</h2>
        <p>Email: <span id="userName">[{userName}]</span></p>
        <p>Balance: $<span>9500</span></p>

        <div>
          <h3>Petition for $500 Stimulus (If your balance is below $10,000)</h3>
          <button type="submit">Request $500</button>
        </div>
      </section>

      <section id="account-settings" className="profile-section">
        <h2>Account Settings</h2>
        <form>
          <label>Change Email:</label>
          <input placeholder="Enter new email" />
          <button type="submit">Update Email</button>

          <div className="dark-mode-toggle">
          <label htmlFor="dark-mode-toggle" className="dark-mode-label">Enable Dark Mode:</label>
          <button type="button" id="dark-mode-toggle" className="btn btn-secondary dark-mode-btn">Enable</button>
        </div>
        </form>
      </section>



      <section id="transaction-history" className="profile-section">
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
