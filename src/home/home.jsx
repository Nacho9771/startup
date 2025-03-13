import React, { useState, useEffect } from 'react';
import '../app.css';
import './home.css';
import axios from 'axios';

const ALPHA_VANTAGE_API_KEY_SEARCH = 'WLT5ZY6ZRCSDT7U9';
const ALPHA_VANTAGE_API_KEY_QUOTE = 'Q9DKRPU4A073VDBG';

export function Home({ userName }) {
  const initialBalance = 100000;
  const [balance, setBalance] = useState(initialBalance);
  const [portfolio, setPortfolio] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const userName_noemail = userName.split('@')[0];

  useEffect(() => {
    const storedPortfolio = JSON.parse(localStorage.getItem(`${userName_noemail}_portfolio`)) || [];
    setPortfolio(storedPortfolio);
    const storedBalance = parseFloat(localStorage.getItem(`${userName_noemail}_balance`)) || initialBalance;
    setBalance(storedBalance);
  }, [userName_noemail]);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${ALPHA_VANTAGE_API_KEY_SEARCH}`;
    try {
      const response = await axios.get(url);
      setSearchResults(response.data.bestMatches || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSelectStock = async (symbol) => {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY_QUOTE}`;
    try {
      const response = await axios.get(url);
      const stockData = response.data['Global Quote'];
      const stock = {
        name: stockData['01. symbol'],
        ticker: stockData['01. symbol'],
        price: parseFloat(stockData['05. price']).toFixed(2),
        dailyChange: parseFloat(stockData['10. change percent']).toFixed(2),
      };
      setSelectedStock(stock);
      setQuantity(1);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleSell = () => {
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
  
    localStorage.setItem(`${userName_noemail}_portfolio`, JSON.stringify(updatedPortfolio));
    localStorage.setItem(`${userName_noemail}_balance`, updatedBalance.toFixed(2));
    setPortfolio(updatedPortfolio);
    setBalance(updatedBalance);
  
    const existingPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
    existingPurchases.push(newTrade);
    localStorage.setItem('purchases', JSON.stringify(existingPurchases));
  
    alert(`${quantity} shares of ${selectedStock.name} sold for $${saleAmount.toFixed(2)}!`);
    setSelectedStock(null);
  };

  let totalCost = 0;
  let balanceAfterPurchase = balance;
  if (selectedStock) {
    totalCost = quantity * parseFloat(selectedStock.price);
    balanceAfterPurchase = balance - totalCost;
  }

  const handlePurchase = () => {
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
    localStorage.setItem(`${userName_noemail}_portfolio`, JSON.stringify(newPortfolio));
    localStorage.setItem(`${userName_noemail}_balance`, newBalance.toFixed(2));
    const purchaseDetails = {
      userName: userName_noemail,
      stockName: selectedStock.name,
      ticker: selectedStock.ticker,
      quantity,
      price: selectedStock.price,
      type: "buy"
    };
    const existingPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
    existingPurchases.push(purchaseDetails);
    localStorage.setItem('purchases', JSON.stringify(existingPurchases));
    setPortfolio(newPortfolio);
    setBalance(newBalance);
    alert(`${quantity} shares of ${selectedStock.name} purchased successfully!`);
    setSelectedStock(null);
  };

  const portfolioValue = portfolio.reduce((total, stock) => total + parseFloat(stock.totalValue), 0);
  const netWorth = balance + portfolioValue;

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

    </main>
  );
}