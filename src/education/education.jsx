import React from 'react';
import './education.css';
import '../app.css';

export function Learn() {
  return (
    <main>
      
        <h1>Basic Investing Information</h1>
  
        <p>
          Investing is about financial security, long-term growth, and controlling your economic future. 
          Many say that the stock market is a good place to make your money work for you!
          There are a ton of differnt ways to invest your money, but the most common are the ones listed below. 
        </p>

        <div id="picture" ClassName="picture-box"><img width="600px" src="wall_street_bull.jpg" alt="Picture Here" /></div>
    
        <hr />
        <h1>Financial Investments</h1>
        <section id="investing-information">
        <h2>Stocks</h2>
        <p>Buying shares of a company means owning a portion of that business. Stocks generally offer higher returns over time compared to other investments but come with volatility.</p>
    
        <h2>Bonds</h2>
        <p>Bonds are debt securities where investors lend money to governments or corporations in exchange for interest payments. They provide stability and predictable returns.</p>
    
        <h2>Mutual Funds</h2>
        <p>Mutual funds pool money from multiple investors to purchase a diversified portfolio of stocks, bonds, or other assets. They offer professional management but come with management fees.</p>
    
        <h2>Exchange-Traded Funds (ETFs)</h2>
        <p>ETFs are similar to mutual funds but trade like stocks on an exchange. They provide diversification and often have lower fees.</p>
    
        <h2>Commodities</h2>
        <p>Investing in raw materials like gold, oil, or agricultural products can serve as a hedge against inflation.</p>

        <h2>Options Trading</h2>
        <p>
        Options are financial derivatives that give investors the right, but usually not the obligation, to buy or sell an asset at a given price within a specific time frame. 
        They are commonly used for stock and market speculation, hedging risk, and generating fast income with low capital.
        </p>
    
        <h3>Call Option</h3>
        <p>
        A call option gives the holder the right to buy an asset at a specified price before the expiration date. 
        Investors buy call options when they expect the price of the asset to go down.
        </p>
    
        <h3>Put Option</h3>
        <p>A put option is like the opposite of a call option, and it gives the holder the right to sell an asset at a specified price before the expiration date. 
          Investors buy put options when they expect the price of the asset to go down.
        </p>
      </section>
       <a href="https://www.merrilledge.com/investor-education/options-education">Complete Guide of Options Trading</a>
       <br />

       <hr />
       <h2>Benefits of Investing</h2>
        <ul>
            <li><strong>Wealth Growth:</strong> Investments compound over time, increasing financial security.</li>
            <li><strong>Inflation Hedge:</strong> Stocks and real estate can protect against inflation.</li>
            <li><strong>Passive Income:</strong> Dividends, rental income, and interest provide cash flow.</li>
            <li><strong>Retirement Planning:</strong> Investments help build a nest egg for the future.</li>
        </ul>

        <div>
          <div>"The market only goes up."</div>
          <div>-some random homeless guy</div>
        </div>
    </main>
  );
}