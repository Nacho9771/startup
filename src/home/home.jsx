import React, { useState, useEffect } from 'react';
import '../app.css';
import './home.css';
import axios from 'axios';

const alphavantageAPI_Search = 'WLT5ZY6ZRCSDT7U9';
const alphavantageAPI_Quote = 'Q9DKRPU4A073VDBG';
const alphavantageAPI_Daily = 'LTE4ZHN2LOCLJ74W';

export function Home({ userName }) {
  const [balance, setBalance] = useState(100000);
  const [portfolio, setPortfolio] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dailyChange, setDailyChange] = useState(null);
  const [liveTrades, setLiveTrades] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  const userName_noemail = userName.split('@')[0];

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/api/user/${userName}`);
        const data = await response.json();
        setBalance(data.balance);
        setPortfolio(data.portfolio);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, [userName]);

  useEffect(() => {
    async function saveUserData() {
      try {
        await fetch(`/api/user/${userName}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ balance, portfolio }),
        });
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
    saveUserData();
  }, [balance, portfolio]);

  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const ws = new WebSocket(`${protocol}://${window.location.host}/ws`);
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'stockUpdate') {
        setPortfolio((prevPortfolio) =>
          prevPortfolio.map((stock) =>
            stock.ticker === data.ticker
              ? { ...stock, price: data.price, totalValue: (data.price * stock.shares).toFixed(2) }
              : stock
          )
        );
      } else if (data.type === 'trade') {
        setLiveTrades((prevTrades) => [data, ...prevTrades].slice(0, 20));
      } else if (data.type === 'notification') {
        addNotification(data.message);
      }
    };

    ws.onclose = () => console.log('WebSocket disconnected');
    return () => ws.close();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (socket) {
        socket.send(JSON.stringify({ type: 'requestStockUpdates' }));
      }
    }, 600000); // 10 minutes
    return () => clearInterval(interval);
  }, [socket]);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${alphavantageAPI_Search}`;
    try {
      const response = await axios.get(url);
      setSearchResults(response.data.bestMatches || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSelectStock = async (symbol) => {
    const urlQuote = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${alphavantageAPI_Quote}`;
    const urlDaily = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${alphavantageAPI_Daily}`;
    try {
      const responseQuote = await axios.get(urlQuote);
      const stockData = responseQuote.data['Global Quote'];
      const stock = {
        name: stockData['01. symbol'],
        ticker: stockData['01. symbol'],
        price: parseFloat(stockData['05. price']).toFixed(2),
        dailyChange: parseFloat(stockData['10. change percent']).toFixed(2),
      };
      setSelectedStock(stock);
      setQuantity(1);

      const responseDaily = await axios.get(urlDaily);
      const timeSeries = responseDaily.data['Time Series (Daily)'];
      const dates = Object.keys(timeSeries);
      const latestDate = dates[0];
      const previousDate = dates[1];
      const latestClose = parseFloat(timeSeries[latestDate]['4. close']);
      const previousClose = parseFloat(timeSeries[previousDate]['4. close']);
      const dailyChange = ((latestClose - previousClose) / previousClose * 100).toFixed(2);
      setDailyChange(dailyChange);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleSell = async () => {
    if (!selectedStock || quantity <= 0) {
      return alert("Select a stock to sell.");
    }
  
    const stockInPortfolio = portfolio.find(stock => stock.ticker === selectedStock.ticker);
    if (!stockInPortfolio) {
      return alert(`You don't own any shares of ${selectedStock.name}`);
    }
    if (quantity > stockInPortfolio.shares) {
      return alert("You can't sell what you don't own! (You don't own that many shares)");
    }
    
    const newShares = stockInPortfolio.shares - quantity;
    const saleAmount = quantity * parseFloat(selectedStock.price); 
    const updatedBalance = balance + saleAmount;
    let updatedPortfolio;
    if (newShares === 0) {
      updatedPortfolio = portfolio.filter(stock => stock.ticker !== selectedStock.ticker);
    } else {
      updatedPortfolio = portfolio.map(stock =>
        stock.ticker === selectedStock.ticker
          ? { ...stock, shares: newShares, totalValue: (newShares * stock.purchasePrice).toFixed(2) }
          : stock
      );
    }
  
    const newTrade = {
      userName: userName_noemail,
      type: "sell",
      ticker: selectedStock.ticker,
      stockName: selectedStock.name,
      quantity: quantity,
      price: parseFloat(selectedStock.price).toFixed(2),
      total: saleAmount.toFixed(2),
      date: new Date().toLocaleString()
    };
  
    try {
      await fetch(`/api/user/${userName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          balance: updatedBalance,
          portfolio: updatedPortfolio,
          purchases: [...portfolio, newTrade],
        }),
      });
      setPortfolio(updatedPortfolio);
      setBalance(updatedBalance);
      socket.send(JSON.stringify({ type: 'notification', message: `${quantity} shares of ${selectedStock.name} sold for $${saleAmount.toFixed(2)}!` }));
      setSelectedStock(null);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  let totalCost = 0;
  let balanceAfterPurchase = balance;
  if (selectedStock) {
    totalCost = quantity * parseFloat(selectedStock.price);
    balanceAfterPurchase = balance - totalCost;
  }

  const handlePurchase = async () => {
    if (!selectedStock || quantity <= 0) {
      return alert("Select a stock and a quantity for purchase!");
    }
    if (totalCost > balance) {
      return alert("Insufficient balance. Sell stock or petition for a stimulus!");
    }
    const newPortfolio = [...portfolio];
    const existingStock = newPortfolio.find(stock => stock.ticker === selectedStock.ticker);
    if (existingStock) {
      existingStock.shares += quantity;
      existingStock.totalValue = (existingStock.shares * existingStock.purchasePrice).toFixed(2);
    } else {
      newPortfolio.push({
        ...selectedStock,
        shares: quantity,
        purchasePrice: selectedStock.price,
        totalValue: (selectedStock.price * quantity).toFixed(2)
      });
    }
    const newBalance = balance - totalCost;
    const purchaseDetails = {
      userName: userName_noemail,
      stockName: selectedStock.name,
      ticker: selectedStock.ticker,
      quantity,
      price: selectedStock.price,
      type: "buy"
    };
    try {
      await fetch(`/api/user/${userName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          balance: newBalance,
          portfolio: newPortfolio,
          purchases: [...portfolio, purchaseDetails],
        }),
      });
      setPortfolio(newPortfolio);
      setBalance(newBalance);
      socket.send(JSON.stringify({ type: 'notification', message: `${quantity} shares of ${selectedStock.name} purchased successfully!` }));
      setSelectedStock(null);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const portfolioValue = portfolio.reduce((total, stock) => total + parseFloat(stock.totalValue), 0);
  const netWorth = balance + portfolioValue;

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 5000);
  };

  return (
    <main>
      <h2 className="account-overview">Account Overview</h2>
      <p>Hello <span id="userName">{userName_noemail}!</span></p>
      <div><p className="Balance">Balance: ${balance.toFixed(2)}</p></div>

      <div className="containers">
        <h3>My Portfolio</h3>
        <p>Total Assets: <strong>${netWorth.toFixed(2)}</strong></p>
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Ticker</th>
              <th>Purchase Price</th>
              <th>Shares Owned</th>
              <th>Total Value</th>
              <th>Daily Change</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.length > 0 ? (
              portfolio.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.ticker}</td>
                  <td>${stock.purchasePrice}</td>
                  <td>{stock.shares}</td>
                  <td>${stock.totalValue}</td>
                  <td>{stock.dailyChange}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No stocks purchased yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <hr />
      <div className="containers">
        <section>
          <h3>Trade Stocks</h3>
          <input
            type="text"
            placeholder="Search for a stock ticker."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary">Search</button>
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Ticker</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={index}>
                  <td>{result['2. name']}</td>
                  <td>{result['1. symbol']}</td>
                  <td>
                    <button 
                      onClick={() => handleSelectStock(result['1. symbol'])} 
                      className="btn btn-primary"
                    >
                      Select Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>(Updated and real-time stock list will come)</p>

          <div>
            {selectedStock ? (
              <>
                <h2>Review Selected Stock</h2>
                <label htmlFor="stock-name"><strong>Stock: </strong><span id="stock-name"><strong>{selectedStock.name} ({selectedStock.ticker})</strong></span></label>
                  <div>
                    <label htmlFor="quantity-input">Quantity: </label>
                    <input
                      type="number"
                      id="quantity-input"
                      min="1"
                      value={quantity === 0 ? '' : quantity}
                      onChange={(e) => setQuantity(e.target.value === '' ? 0 : Number(e.target.value))}
                    />
                  </div>
                <h4>Buy</h4>
                <p>Total Cost: <strong>${totalCost.toFixed(2)}</strong></p>
                <p>Balance After Purchase: <strong>${balanceAfterPurchase.toFixed(2)}</strong></p>
                <button onClick={handlePurchase} className="btn btn-primary">
                  Buy Stock
                </button>

                <h4>Sell</h4>
                <p>Total Sale: <strong>${(quantity * selectedStock.price).toFixed(2)}</strong></p>
                <p>Balance After Sale: <strong>${(balance + quantity * selectedStock.price).toFixed(2)}</strong></p>
                <button onClick={handleSell} className="btn btn-danger">
                  Sell Stock
                </button>
              </>
            ) : (
              <p><strong>Please select a stock.</strong></p>
            )}
          </div>
        </section>
      </div>

      <div className="notification-container">
        {notifications.map((notif) => (
          <div key={notif.id} className="notification-bubble">
            {notif.message}
          </div>
        ))}
      </div>

    </main>
  );
}

