import React, { useState, useEffect } from 'react';
import { quickSort } from './quicksort'; 
import './forum.css';
import '../app.css';

export function Forum({ userName }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userPurchases, setUserPurchases] = useState([]);
  const [userTrades, setUserTrades] = useState([]);
  const [storedBalance, setStoredBalance] = useState(0);
  const [storedNetWorth, setStoredNetWorth] = useState(0);

  const userName_noemail = userName.split('@')[0];

  useEffect(() => {
    const storedBalance = parseFloat(localStorage.getItem(`${userName_noemail}_balance`)) || 0;
    setStoredBalance(storedBalance);
    const storedPortfolio = JSON.parse(localStorage.getItem(`${userName_noemail}_portfolio`)) || [];
    const portfolioValue = storedPortfolio.reduce((total, stock) => total + parseFloat(stock.totalValue), 0);
    const netWorth = storedBalance + portfolioValue;
    setStoredNetWorth(netWorth);

    const storedTrades = JSON.parse(localStorage.getItem('purchases')) || [];
    setUserTrades(storedTrades.slice(-10));
  }, [userName_noemail]);

  useEffect(() => {
    const storedPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
    setUserPurchases(storedPurchases);
  }, []);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const storedPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
    setLeaderboard(quickSort(storedLeaderboard).slice(0, 10));
    setUserPurchases(storedPurchases.slice(-10));
  }, []);

  useEffect(() => {
    if (userName_noemail) {
      const userExists = leaderboard.some(user => user.name === userName_noemail);
      if (!userExists) {
        const newUser = { name: userName_noemail, balance: storedNetWorth.toFixed(2) };
        const updatedLeaderboard = quickSort([...leaderboard, newUser]);
        setLeaderboard(updatedLeaderboard.slice(0, 10));
        localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
      }
    }
  }, [userName_noemail, leaderboard, storedNetWorth]);

  useEffect(() => {
    fetch('/api/comments')
      .then(response => response.json())
      .then(data => setComments(data));
  }, []);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userName_noemail, text: newComment }),
      })
        .then(response => response.json())
        .then(comment => {
          setComments(prevComments => [...prevComments, comment].slice(-10));
          setNewComment('');
        });
    }
  };

  useEffect(() => {
    if (leaderboard.length === 0) {
      const mockUsers = [];
      mockUsers.push({ name: `Tom`, balance: (100000 + Math.random() * 50000).toFixed(2) });
      mockUsers.push({ name: `Lee`, balance: (100000 + Math.random() * 50000).toFixed(2) });
      mockUsers.push({ name: `Gordon`, balance: (100000 + Math.random() * 50000).toFixed(2) });
      mockUsers.push({ name: `Mark`, balance: (100000 + Math.random() * 50000).toFixed(2) });
      mockUsers.push({ name: `Nancy`, balance: (100000 + Math.random() * 50000).toFixed(2) });
      mockUsers.push({ name: `Dan`, balance: (100000 + Math.random() * 50000).toFixed(2) });
      mockUsers.push({ name: `Seth`, balance: (100000 + Math.random() * 50000).toFixed(2) });
      mockUsers.push({ name: `Kent`, balance: (100000 + Math.random() * 50000).toFixed(2) });
      mockUsers.push({ name: `Dennis`, balance: (100000 + Math.random() * 50000).toFixed(2) });
      setLeaderboard(mockUsers);
      localStorage.setItem('leaderboard', JSON.stringify(mockUsers));
    }
  }, [leaderboard]);

  return (
    <main>
      <section>
        <h2>Leaderboard</h2>
        <ol id="leaderboard-list">
          {leaderboard.slice(-10).reverse().map((user, index) => (
            <li key={index}>{user.name}: ${user.balance}</li>
          ))}
        </ol>
      </section>

      <hr />

      <section>
        <h2>Community (Database placeholder)</h2>
        <div>
          <label htmlFor="comment-input">Comment: </label>
          <input
            type="text"
            id="comment-input"
            placeholder="Enter Comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="button" id="submit-comment" onClick={handleCommentSubmit}>
            Submit
          </button>
        </div>

        <h3>Community Comments</h3>
        <ul>
          {comments.slice(-10).reverse().map((comment, index) => (
            <li key={index}>
              <strong>{comment.user}</strong>: "{comment.text}"
            </li>
          ))}
        </ul>
        <section id="trade-activity">
          <h3>Recent Trades</h3>
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
      </section>
    </main>
  );
}