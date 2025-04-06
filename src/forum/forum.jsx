import React, { useState, useEffect } from 'react';
import { quickSort } from './quicksort'; 
import './forum.css';
import '../app.css';

export function Forum({ userName, balance, netWorth, purchases }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        const sortedLeaderboard = quickSort(data).reverse();
        setLeaderboard(sortedLeaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    }
    fetchLeaderboard();
  }, []);

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      setLoading(true);
      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newComment }),
        });
        const comment = await response.json();
        setComments(prevComments => [...prevComments, comment].slice(-10));
        setNewComment('');
        setLoading(false);
        setNotification('Comment sent successfully!'); 
        setFadeOut(false); 
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => setNotification(''), 1000);
        }, 2500); 
      } catch (error) {
        setLoading(false);
        setNotification('Failed to send comment.'); 
        setFadeOut(false); 
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => setNotification(''), 1000);
        }, 2500); 
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  return (
    <main>
      <section>
        <h2>Leaderboard</h2>
        <ol id="leaderboard-list">
          {leaderboard.map((user, index) => (
            <li key={index}>
              {user.name}: ${typeof user.netWorth === 'number' 
                ? user.netWorth.toFixed(2) 
                : (user.netWorth || 100000).toFixed(2)}
            </li>
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
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
        </div>
        <button type="button" id="submit-comment" onClick={handleCommentSubmit} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
        {notification && <div id="notification" className={`pop-in ${fadeOut ? 'fade-out' : ''}`}>{notification}</div>}

        <h3>Community Comments</h3>
        <ul>
          {comments.slice(-10).reverse().map((comment, index) => (
            <li key={index}>
              <strong>{comment.user}</strong>: "{comment.text}"
            </li>
          ))}
        </ul>
      </section>

      <section id="trade-activity">
        <h3>Recent Trades</h3>
        <ul>
          {purchases.length > 0 ? (
            purchases.slice(-40).reverse().map((trade, index) => (
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