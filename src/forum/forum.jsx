import React, { useState, useEffect } from 'react';
import './forum.css';
import '../app.css';

export function Forum({ userName }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userPurchases, setUserPurchases] = useState([]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    const storedPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
    setLeaderboard(storedLeaderboard);
    setComments(storedComments);
    setUserPurchases(storedPurchases);
  }, []);

  useEffect(() => {
    if (userName) {
      const userExists = leaderboard.some(user => user.name === userName);
      if (!userExists) {
        const newUser = { name: userName, balance: (100000 + Math.random() * 50000).toFixed(2) };
        const updatedLeaderboard = [...leaderboard, newUser];
        setLeaderboard(updatedLeaderboard);
        localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
      }
    }
  }, [userName, leaderboard]);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, { user: userName, text: newComment }];
      setComments(updatedComments);
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      setNewComment('');
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
      mockUsers.push({ name: `Michael`, balance: (100000 + Math.random() * 50000).toFixed(2) });
      setLeaderboard(mockUsers);
      localStorage.setItem('leaderboard', JSON.stringify(mockUsers));
    }
  }, [leaderboard]);

  useEffect(() => {
    const storedPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
    setUserPurchases(storedPurchases);
  }, []);

  return (
    <main>
      <section>
        <h2>Leaderboard</h2>
        <ol id="leaderboard-list">
          {leaderboard.map((user, index) => (
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

        <h3>Recent Purchases</h3>
        <ul>
          {userPurchases.map((purchase, index) => (
            <li key={index}>
              {purchase.userName} purchased {purchase.quantity} of the stock {purchase.stockName} for ${purchase.price}.
            </li>
          ))}
        </ul>

        <h3>Community Comments</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.user}</strong>: "{comment.text}"
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
