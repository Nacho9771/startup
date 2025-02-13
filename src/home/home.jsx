import React from 'react';
import '../app.css';
import './home.css';
import { NavLink } from 'react-router-dom';

export function Home() {
  return (
    <main>
      <h2 className="account-overview">Account Overview (Websocket to be used on this page)</h2>
      <p>Hello, <span id="email"> [their email without the '@gmail.com' part goes here]</span></p>
      <div className="containers"><p className="Balance">Balance: $100000</p></div>

      <div className="containers">
        <h3>My Portfolio</h3>
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Ticker (Stock Abbreviation)</th>
              <th>Current Price</th>
              <th>Shares Owned</th>
              <th>Total Value</th>
              <th>Daily Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nvidia</td>
              <td>NVDA</td>
              <td>$[Live Price]</td>
              <td>[Shares Owned]</td>
              <td>$[Total Value]</td>
              <td>[Number %]</td>
            </tr>
            <tr>
              <td>AMD</td>
              <td>AMD</td>
              <td>$[Live Price]</td>
              <td>[Shares Owned]</td>
              <td>$[Total Value]</td>
              <td>[Number %]</td>
            </tr>
            <tr>
              <td>Tesla</td>
              <td>TSLA</td>
              <td>$[Live Price]</td>
              <td>[Shares Owned]</td>
              <td>$[Total Value]</td>
              <td>[Number %]</td>
            </tr>
            <tr>
              <td>Meta Platforms</td>
              <td>META</td>
              <td>$[Live Price]</td>
              <td>[Shares Owned]</td>
              <td>$[Total Value]</td>
              <td>[Number %]</td>
            </tr>
            <tr>
              <td>Bitcoin</td>
              <td>BTC</td>
              <td>$[Live Price]</td>
              <td>[Amount Owned]</td>
              <td>$[Total Value]</td>
              <td>[Number %]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />
      <div className="containers">
        <section>
          <h3>Search Stocks (PLACEHOLDER FOR 3rd PARTY SERVICE)</h3>
          <form>
            <label>Search for a Stock:</label>
            <input type="text" placeholder="Enter stock name or symbol" />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          <p>(This will be a placeholder for a 3rd party service that will allow you to search for stocks)</p>
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Ticker</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tesla</td>
                <td>TSLA</td>
                <td><button type="submit" className="btn btn-primary">Select Stock for Purchase</button></td>
              </tr>
              <tr>
                <td>AMD</td>
                <td>AMD</td>
                <td><button type="submit" className="btn btn-primary">Select Stock for Purchase</button></td>
              </tr>
              <tr>
                <td>Invesco QQQ ETF</td>
                <td>QQQ</td>
                <td><button type="submit" className="btn btn-primary">Select Stock for Purchase</button></td>
              </tr>
            </tbody>
          </table>
          <p>(More stocks will come, I just don't know how to update the website live yet)</p>

          <div>
            <h3>Buy Selected Stock</h3>
            <p>Stock: <span>[Stock Name]</span></p>
            <p>Price: $<span>[Stock Price]</span></p>
            <label>Quantity:</label>
            <input type="number" placeholder="Enter quantity" />
            <button type="submit" className="btn btn-primary">Confirm Purchase</button>
          </div>
        </section>
      </div>

      {/* Updated Logout Section */}
      <div className="logout-section">
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
                Logout of Easy Trading
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
