import React from 'react';
import './forum.css';

export function Forum() {
  return (
    <main>
      <section>
        <h2>Leaderboard</h2>
        <ol id="leaderboard-list">
          <li>Tom: $150000</li>
          <li>Lee: $130000</li>
          <li>Gordon: $120000</li>
          <li>Mark: $110000</li>
          <li>Nancy: $105000</li>
          <li>Dan: $104000</li>
          <li>Seth: $103000</li>
          <li>Kent: $102000</li>
          <li>Dennis: $101000</li>
          <li>Michael: $100500</li>
        </ol>
      </section>

      <hr />

      <section>
        <h2>Community (Database placeholder)</h2>
        <div>
          <label for="comment-input">Comment: </label>
          <input type="text" id="comment-input" placeholder="Enter Comment" />
          <button type="submit" id="submit-comment">Submit</button>
        </div>
        <ul>
          <li>[User] purchased [number] of the stock [stock abbreviation] for [stock price].</li>
          <li>[User] Comment: "comment goes here" </li>
          <li>[User] purchased [number] of the stock [stock abbreviation] for [stock price].</li>
          <li>[User] purchased [number] of the stock [stock abbreviation] for [stock price].</li>
        </ul>
      </section>
    </main>
  );
}