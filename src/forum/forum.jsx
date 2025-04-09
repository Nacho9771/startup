import React, { useState, useEffect } from 'react';
import './forum.css';
import '../app.css';

export function Forum({ userName, balance, netWorth, portfolio, notifications }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [serverNotifications, setServerNotifications] = useState([]);
  const [archivedNotifications, setArchivedNotifications] = useState([]);

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
    async function fetchNotifications() {
      try {
        const response = await fetch('/api/notifications');
        const data = await response.json();
        setArchivedNotifications(data.map((notif) => notif.message)); // Load saved notifications
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }
    fetchNotifications();
  }, []);

  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const ws = new WebSocket(`${protocol}://${window.location.hostname}:4000/ws`); // Use backend server port
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'chat') {
        setChats((prevChats) => [...prevChats, data]); // Add chat message to chats
      } else if (data.type === 'notification') {
        setServerNotifications((prev) => [...prev, data.message]); // Add server notification
        setArchivedNotifications((prev) => [...prev, data.message]); // Add new notifications
      }
    };

    ws.onclose = () => console.log('WebSocket disconnected');
    return () => ws.close();
  }, []);

  useEffect(() => {
    async function fetchUserTrades() {
      try {
        const response = await fetch(`/api/user/${userName}`);
        const data = await response.json();
        setChats(data.purchases || []); // Fetch purchases as chats
      } catch (error) {
        console.error('Error fetching user trades:', error);
      }
    }
    fetchUserTrades();
  }, [userName]);

  useEffect(() => {
    async function fetchChats() {
      try {
        const response = await fetch('/api/chats'); // Fetch chats from the backend
        const data = await response.json();
        setChats(data); // Initialize chats with fetched data
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    }
    fetchChats();
  }, []);

  const sendMessage = () => {
    if (message.trim() && socket) {
      const chat = { type: 'chat', user: userName, text: message }; // Include 'type' for backend processing
      socket.send(JSON.stringify(chat)); // Send chat message via WebSocket
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

      <section id="notifications">
        <h3>Server Notifications</h3>
        <ul>
          {serverNotifications.map((notif, index) => (
            <li key={index}>{notif}</li>
          ))}
        </ul>
      </section>

      <section id="notification-archive">
        <h3>Notification Archive</h3>
        <ul>
          {archivedNotifications.map((notif, index) => (
            <li key={index}>{notif}</li>
          ))}
        </ul>
      </section>

      <section id="trade-activity">
        <h3>Recent Trades</h3>
        <ul>
          {chats
            .filter((chat) => chat.type === 'trade') // Filter only trade messages
            .slice(-40)
            .reverse()
            .map((trade, index) => (
              <li key={index}>
                {trade.userName} {trade.type === "buy" ? "bought" : "sold"} {trade.quantity} shares of {trade.stockName} ({trade.ticker}) for ${trade.price}.
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}