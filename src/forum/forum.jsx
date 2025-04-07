import React, { useState, useEffect } from 'react';
import './forum.css';
import '../app.css';

export function Forum({ userName, purchases }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch('/api/scores');
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    }
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const ws = new WebSocket(`${protocol}://${window.location.host}/ws`);
    setSocket(ws);

    ws.onmessage = (event) => {
      const chat = JSON.parse(event.data);
      setChats((prevChats) => [...prevChats, chat]);
    };

    ws.onclose = () => console.log('WebSocket disconnected');
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (message.trim() && socket) {
      const chat = { user: userName, text: message };
      socket.send(JSON.stringify(chat));
      setMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <main>
      <section>
        <h2>Leaderboard</h2>
        <ol id="leaderboard-list">
          {leaderboard.map((user, index) => (
            <li key={index}>
              {user.name}: ${user.netWorth.toFixed(2)}
            </li>
          ))}
        </ol>
      </section>

      <hr />

      <section>
        <h2>Community Chat</h2>
        <div id="chatbox">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={sendMessage}>Send</button>
          <div id="chat-messages">
            {chats.slice(-20).reverse().map((chat, index) => (
              <div key={index}>
                <strong>{chat.user.split('@')[0]}</strong>: {chat.text}
              </div>
            ))}
          </div>
        </div>
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