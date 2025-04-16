import React, { useState, useEffect } from 'react';
import '../app.css';
import './profile.css';

export function Profile({ userName, balance, netWorth, portfolio, notifications }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('');
  const [accountAge, setAccountAge] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newYearlyIncome, setNewYearlyIncome] = useState('');
  const [newRiskTolerance, setNewRiskTolerance] = useState('');
  const [purchases, setPurchases] = useState([]);

  const userName_noemail = userName.split('@')[0];

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch(`/api/user/${userName}`);
        const data = await response.json();
        const profile = data.profile || {};
        setPhoneNumber(profile.phoneNumber || '');
        setFullName(profile.fullName || '');
        setYearlyIncome(profile.yearlyIncome || '');
        setRiskTolerance(profile.riskTolerance || '');
        setPurchases(data.purchases || []);
        if (profile.creationTime) {
          const timeSinceCreation = new Date() - new Date(profile.creationTime);
          setAccountAge(Math.floor(timeSinceCreation / (1000 * 60 * 60 * 24)));
        } else {
          setAccountAge(0);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
    fetchUserProfile();
  }, [userName]);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${protocol}://${window.location.host}/ws`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trade' && data.userName === userName.split('@')[0]) {
        setPortfolio((prevPortfolio) => [...prevPortfolio, data]); // Add personal trade
      }
    };

    ws.onclose = () => console.log('WebSocket disconnected');
    return () => ws.close();
  }, [userName]);

  // Helper to fetch the latest profile from the backend
  async function getLatestProfile() {
    try {
      const response = await fetch(`/api/user/${userName}`);
      const data = await response.json();
      return data.profile || {};
    } catch (error) {
      return {};
    }
  }

  const handleStimulus = async () => {
    if (netWorth < 10000) {
      const newBalance = balance + 500;
      try {
        // Always fetch the latest profile before updating
        const latestProfile = await getLatestProfile();
        await fetch(`/api/user/${userName}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            balance: newBalance,
            portfolio,
            profile: {
              ...latestProfile,
              creationTime: latestProfile.creationTime || new Date().toISOString(),
            },
          }),
        });
        alert("You just got a $500 bonus! Don't lose it too quickly");
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    } else {
      alert('You are not eligible for a stimulus. You are too rich!');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Always fetch the latest profile before updating
    const latestProfile = await getLatestProfile();

    const updatedProfile = {
      ...latestProfile,
      phoneNumber: newPhoneNumber || latestProfile.phoneNumber || phoneNumber,
      fullName: newFullName || latestProfile.fullName || fullName,
      yearlyIncome: newYearlyIncome || latestProfile.yearlyIncome || yearlyIncome,
      riskTolerance: newRiskTolerance || latestProfile.riskTolerance || riskTolerance,
    };

    try {
      const response = await fetch(`/api/user/${userName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          balance,
          portfolio,
          profile: updatedProfile,
        }),
      });

      if (response.ok) {
        // Fetch the updated profile after saving
        const updatedData = await response.json();
        const profile = updatedData.updatedData.profile || {};
        setPhoneNumber(profile.phoneNumber || '');
        setFullName(profile.fullName || '');
        setYearlyIncome(profile.yearlyIncome || '');
        setRiskTolerance(profile.riskTolerance || '');
        alert('Profile updated successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to update profile: ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('An error occurred while updating your profile.');
    }
  };

  return (
    <main className="profile-container">
      <section id="profile-info" className="profile-section">
        <h2>Profile Information</h2>
        <p>User: <span id="userName">{userName_noemail}</span></p>
        <p>Balance: ${balance.toFixed(2)}</p>
        <p>Net Worth: ${netWorth.toFixed(2)}</p>
        <p>Age of EasyTrading Account: {accountAge} days</p>
        <p>Phone Number: {phoneNumber || "None"}</p>
        <p>Full Name: {fullName || "None"}</p>
        <p>Yearly Income: {yearlyIncome || "None"}</p>
        <p>Risk Tolerance: {riskTolerance || "None"}</p>
        <div>
          <h3>Petition for $500 Stimulus (If your net worth is below $10,000)</h3>
          <button onClick={handleStimulus}>Request $500</button>
        </div>
      </section>

      <section id="account-settings" className="profile-section">
        <h2>Update Account</h2>
        <form onSubmit={handleUpdateProfile}>
          <label>Phone Number:</label>
          <div>
            <input
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <label>Full Name:</label>
          <div>
            <input
              type="text"
              value={newFullName}
              onChange={(e) => setNewFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label>Yearly Income:</label>
            <input
              type="number"
              value={newYearlyIncome}
              onChange={(e) => setNewYearlyIncome(e.target.value)}
              placeholder="Enter your yearly income"
            />
          </div>
          <div>
            <label>Risk Tolerance:</label>
            <select
              value={newRiskTolerance}
              onChange={(e) => setNewRiskTolerance(e.target.value)}
            >
              <option value="">Select your risk tolerance</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </section>

      <section id="transaction-history" className="profile-section">
        <h2>Personal Transaction History</h2>
        <ul>
          {purchases.length > 0 ? (
            purchases
              .filter((trade) => trade.userName === userName.split('@')[0])
              .slice(-40)
              .reverse()
              .map((trade, index) => (
                <li key={index}>
                  {trade.userName} {trade.type === "buy" ? "bought" : "sold"} {trade.quantity} shares of {trade.stockName} ({trade.ticker}) for ${trade.price}.
                </li>
              ))
          ) : (
            <li>No trades have been made yet.</li>
          )}
        </ul>
      </section>
    </main>
  );
}