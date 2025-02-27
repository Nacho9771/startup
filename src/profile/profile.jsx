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
  const [storedNetWorth, setStoredNetWorth] = useState(0);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newYearlyIncome, setNewYearlyIncome] = useState('');
  const [newRiskTolerance, setNewRiskTolerance] = useState('');

  const userName_noemail = userName.split('@')[0];

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem(userName_noemail)) || {};
    if (userProfile.phoneNumber) setPhoneNumber(userProfile.phoneNumber);
    if (userProfile.fullName) setFullName(userProfile.fullName);
    if (userProfile.yearlyIncome) setYearlyIncome(userProfile.yearlyIncome);
    if (userProfile.riskTolerance) setRiskTolerance(userProfile.riskTolerance);
    if (userProfile.creationTime) {
      const timeSinceCreation = new Date() - new Date(userProfile.creationTime);
      setAccountAge(Math.floor(timeSinceCreation / (1000 * 60 * 60 * 24)));
    } else {
      setAccountAge(0);
    }

    const storedTransactions = JSON.parse(localStorage.getItem('purchases')) || [];
    setTransactions(storedTransactions);
    const userSpecificTrades = storedTransactions.filter(trade => trade.userName === userName_noemail);
    setUserTrades(userSpecificTrades);
    const storedPortfolio = JSON.parse(localStorage.getItem(`${userName_noemail}_portfolio`)) || [];
    setPortfolio(storedPortfolio);
    const storedBalance = parseFloat(localStorage.getItem(`${userName_noemail}_balance`)) || 0;
    setStoredBalance(storedBalance);
    const portfolioValue = storedPortfolio.reduce((total, stock) => total + parseFloat(stock.totalValue), 0);
    const netWorth = storedBalance + portfolioValue;
    setStoredNetWorth(netWorth);
  }, [userName_noemail]);

  const handleStimulus = () => {
    if (storedNetWorth < 10000) {
      const newBalance = balance + 500;
      setBalance(newBalance);
      localStorage.setItem(`${userName_noemail}_balance`, newBalance.toFixed(2));
      alert("You just got a $500 bonus! Don't lose it too quickly");
    } else {
      alert('You are not eligible for a stimulus. You are too rich!');
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setPhoneNumber(newPhoneNumber);
    setFullName(newFullName);
    setYearlyIncome(newYearlyIncome);
    setRiskTolerance(newRiskTolerance);

    const updatedProfile = {
      phoneNumber: newPhoneNumber,
      fullName: newFullName,
      yearlyIncome: newYearlyIncome,
      riskTolerance: newRiskTolerance,
      creationTime: new Date().toISOString()
    };
    localStorage.setItem(userName_noemail, JSON.stringify(updatedProfile));
    alert('Profile updated successfully!');
  };

  return (
    <main className="profile-container">
      <section id="profile-info" className="profile-section">
        <h2>Profile Information</h2>
        <p>User: <span id="userName">{userName_noemail}</span></p>
        <p>Balance: ${storedBalance.toFixed(2)}</p>
        <p>Net Worth: ${storedNetWorth.toFixed(2)}</p>
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