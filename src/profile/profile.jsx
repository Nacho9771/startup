import React, { useState, useEffect } from 'react';
import '../app.css';
import './profile.css';

export function Profile({ userName, balance, setBalance, netWorth }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('');
  const [accountAge, setAccountAge] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [userTrades, setUserTrades] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [storedBalance, setStoredBalance] = useState(0);

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem(userName)) || {};
    if (userProfile.phoneNumber) setPhoneNumber(userProfile.phoneNumber);
    if (userProfile.fullName) setFullName(userProfile.fullName);
    if (userProfile.yearlyIncome) setYearlyIncome(userProfile.yearlyIncome);
    if (userProfile.riskTolerance) setRiskTolerance(userProfile.riskTolerance);
    if (userProfile.creationTime) {
      const timeSinceCreation = new Date() - new Date(userProfile.creationTime);
      setAccountAge(Math.floor(timeSinceCreation / (1000 * 60 * 60 * 24)));
    } else {
      setAccountAge(0);
    };

    const storedTransactions = JSON.parse(localStorage.getItem('purchases')) || [];
    setTransactions(storedTransactions);
    const userSpecificTrades = storedTransactions.filter(trade => trade.userName === userName);
    setUserTrades(userSpecificTrades);
    const storedPortfolio = JSON.parse(localStorage.getItem(`${userName}_portfolio`)) || [];
    setPortfolio(storedPortfolio);
    const storedBalance = parseFloat(localStorage.getItem(`${userName}_balance`)) || 0;
    setStoredBalance(storedBalance);
  }, [userName]);

  const handleStimulus = () => {
    if (netWorth < 10000) {
      setBalance(balance + 500);
      localStorage.setItem(`${userName}_balance`, (balance + 500).toFixed(2));
      alert("You just got a $500 bonus! Don't lost it too quickly");
    } else {
      alert('You are not eligible for a stimulus. You are too rich!');
    }
  };

  return (
    <main className="profile-container">
      <section id="profile-info" className="profile-section">
        <h2>Profile Information</h2>
        <p>User: <span id="userName">{userName}</span></p>
        <p>Balance: ${storedBalance.toFixed(2)}</p>
        <p>Age of EasyTrading Account: {accountAge} days</p>
        <div>
          <h3>Petition for $500 Stimulus (If your net worth is below $10,000)</h3>
          <button onClick={handleStimulus}>Request $500</button>
        </div>
      </section>

      <section id="account-settings" className="profile-section">
        <h2>Account Settings</h2>
        <form>
          <div>
            <label>Phone Number:</label>
            <span> Current Phone Number: {phoneNumber || "None"}</span>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label>Full Name:</label>
            <span> Current Full Name: {fullName || "None"}</span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label>Yearly Income:</label>
            <span> Current Yearly Income: {yearlyIncome || "None"}</span>
            <input
              type="number"
              value={yearlyIncome}
              onChange={(e) => setYearlyIncome(e.target.value)}
              placeholder="Enter your yearly income"
            />
          </div>

          <div>
            <label>Risk Tolerance:</label>
            <span> (Current Risk Tolerance: {riskTolerance || "None"})</span>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
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
            {userTrades.length > 0 ? (
              userTrades.slice(-40).reverse().map((trade, index) => (
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