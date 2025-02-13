import React from 'react';
import './profile.css';
import '../app.css';

export function Profile() {
  return (
    <main className="profile-container">
      <section id="profile-info" className="profile-section">
        <h2>Profile Information</h2>
        <p>Email: <span>[user.email@gmail.com]</span></p>
        <p>Balance: $<span>9500</span></p>

        <div>
          <h3>Petition for $500 Stimulus (If your balance is below $10,000)</h3>
          <button type="submit">Request Stimulus</button>
        </div>
      </section>

      <section id="account-settings" className="profile-section">
        <h2>Account Settings</h2>
        <form>
          <label>Change Email:</label>
          <input placeholder="Enter new email" />
          <button type="submit">Update Email</button>

          <br />
          <br />
          <br />

          <label htmlFor="dark-mode-toggle">
            Enable Dark Mode
            <input type="checkbox" id="dark-mode-toggle" />
          </label>
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
