# EasyTrading App

[My Notes](notes.md)

look at me I made a change and I'm going to submit it into Github

That first edit was in VScode. This one is using the Github web app.

> [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

(I am not going to edit that paragraph above this because there are too many valuable reminders to lose, so here is proof that I read it!)

> [!NOTE]
> I reviewed the documentation about Markdown. Here is the link for future reference (https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Many people want to start trading in the stock market but face challenges that hold them back - whether it’s a lack of disposable income, fear of risk or volatility, or limited knowledge about trading. The EasyTrading App is a paper-trading platform designed to help users learn the fundamentals of stock market trading and analysis in a risk-free environment. Users can practice trades using real-time market data, collaborate, and compete to see who can grow their practice portfolio the most. The app is designed to be both educational and engaging, helping users gain confidence and skills before they start trading with real money.

### Design

![EasyTrading Homepage](InvestingAccount.png)

This is an example of the EasyTrading UI homepage. It is designed to mimic other trading applications but keep it more simple. There will be a login page before the users can interact with their homepage, adn there will be four other options on the bottom of the screen they use. The diagram below shows how people would interact with the server, and how the server would save the data and communicate through the leaderboards/group tab.

![User to Server Interaction](ServerDiagram.png)

### Key features

- News feed displaying the transations of each user in real time
- Leaderboard showing the users with the highest value portfolio
- Starting balance at $100,000 paper money
- Ability to exchange using current market prices
- Secure login through HTTPS
- Ability to view the portfolio of other users
- Page educating users on stock market and trading information
- Stock holdings persistently stored

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Five HTML pages. One for login, one for home page, one for leaderboard, one for education, and one for account information. Hyperlinks to choice artifact.
- **CSS** - Application styling that looks minimalistic and modern to make the application simple. Goal is to look good on multiple screen sizes with a standard color scheme of blue, black, and white (BYU colors!). Whitespace and contrast chosen with user experience considered.
- **React** - Provides login, search bar for finding stocks, stock list for all available stocks, portfolio section for tracking the users personal stocks and other portfolios, buy and sell interface to make transations, view the leaderboard, and display real-time news feeds. Login page, main trading UI, and the users holdings made through the react router.
- **Service** - Backend service with endpoints for user authentication, fetch available stocks, get the current and historical stock price, simulate buying and selling, update the leaderboard, and provide the users holdings and news feed.
- **DB/Login** - Store users accounts, stocks, trade history, and the leaderboard in the database. User credentials stored in database, and cannot login unless authenticated.
- **WebSocket** - Trades and leaderboard are broadcast to all other users on the platform.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [Connor's CS260 Startup Server](https://lolwinning.click).
- [x] **EC2, Route 53 were properly configured with the server**
- [x] **HTTPS and TLS enabled with Caddy**

## 🚀 HTML deliverable

For this deliverable I did all of the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - All of the HTML pages that I need are made for each component of my application
- [x] **Proper HTML element usage** - I used proper HTML tags and formatted it correctly
- [x] **Links** - The pages are linked to eachother and I have a link to an external website in the "Learn" HTML section
- [x] **Text** - I have a ton of text all over every HTML document
- [x] **3rd party API placeholder** - I will need a 3rd party API to fetch live market data and stock information, so I put placeholders for these features.
- [x] **Images** - I included two different images within my project.
- [x] **Login placeholder** - The login page is included as a placeholder, and it is located in the index.html file so that it is the first page you encounter.
- [x] **DB data placeholder** - I will need to store data in a database for this project, with all the personal user data, the multi-user data, and the comments and purchase feed. I put placeholders here for the future.
- [x] **WebSocket placeholder** - I will need WebSocket for live market updates and the collaborative space as well, so there are placeholders for it in my documents.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I created some adaptable header, footer, and a ton of main content body stuff that carries over all of the html pages. The header, footer, and all page elements match with BYU colors! White spacing was added to make the text more readable, and some sections were made to separate the content and make it way more organized.
- [x] **Navigation elements** - I made each navigation element have its own button, I made it be separated by this gray line, and I made sure that you could not access any of the pages directly from the login page.
- [x] **Responsive to window resizing** - I made sure that the elements within the pages could be resized according to the window size. For instance, my elements can flex and my tables have the ability to remove certain parts of them once the window gets too small.
- [x] **Application elements** - One huge thing about my application are the tables, buttons, links, and simple elements like that which are standard for trading apps, and I modified these to look a lot nicer and feel more professional.
- [x] **Application text content** - There is a lot of text within my application, so a lot of padding, margins, color, and text details were added to my css code.
- [x] **Application images** - I have images and I adjusted them so that the corners were rounded and they had proper spacing around them!

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

For this deliverable I focused on successfully porting everything from HTML to JSX files, and for some reason it was a nightmare on my end. I learned a lot about solving problems and debugging code while fixing all of the porting issues I had, but all 5 pages work now! I also made a tiny bit of javascript and adjustments to code, but I'm saving most of that for next time.

- [x] **Bundled using Vite** - Completed! Vite was extremely useful when making adjustments to my page.
- [x] **Components** - Login, the stock section, buying stocks section, profile section, leaderboards, and chatbox mocked for future database, javascript, and websocket implementation.
  - [x] **Login/Logout** - When you login to the website it takes yo uto the homepage, and I even included a logout placeholder that takes you to the login page again! (I had some help with that part)
  - [x] **Stocks** - I included the placeholder for the personal stocks spreadsheet
  - [x] **Purchase Stocks** - I included the section to purchase stocks that is only a placeholder and will significantly change in the near future
  - [x] **Profile** - The profile section is mapped out and ready
  - [x] **Leaderboards and Comments** - You can successfully navigate to the forum section and see "other people's scores" (they dont actually exist yet)
- [x] **Router** - Routing between login and Easy Trading pages successful

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

I ran into a ton of instances where I would use "npm run dev 'o'" and my page would not load. I learned so much about react, using pulls, pushes, and general git information, and debugging when I worked on this part of the project. It was hard and I am glad I started early.

- [x] **All functionality implemented or mocked out** - Yep, everything works really well! I am surporised how hard it is to get everyhting to work, nad I had a lot of run-ins trying to import variables, but I ended up just using the local storage as a database holder, and I plan on using the database for everything I have stored in local storage right now. All placeholders are in, but functional!
- [x] **Hooks** - I used useState for the functional parts of my code, like the balance, portfolio, and selected stock. I also used useEffect for things like loading local data to update other jsx files from the local storage.
- [x] **General Polishing** I fixed up some aspects of the frontend layout and made it look more snazzy. Nothing too crazy, but I just made it look a bit more even and professional.

## 🚀 Service deliverable

This was an extremely difficult deliverable to wrap my head around, and I learned a lot about NodeJS and backend service in general. I really needed a lot of help in order to code and understand what was taught this time, and I once again learned a lot of dumb lessons the hard way. Nevertheless, everything I wanted to include in this update is done!

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Done! All implemented
- [x] **Static middleware for frontend** - Yep! That's in there too, making sure everything is secure
- [x] **Calls to third party endpoints** - I ended up using three keys from a third party API called AlphaVantage in order to extract realtime stock data, daily changes, and the search engine. This is located in the home.jsx file near the top! However, it can only handle 25 requests a day - unless I wanted to pay $50 (which...I don't want to do that lol). So, if the stocks don't load I promise that they will the next day and you could try it later.
- [x] **Backend service endpoints** - Endpoints are fully fledged and included across all pages, updating things like account information, login stuff, new user authentication/authorization, portfolios, balances, the leaderboard, the comments, and other things that make the website functional outside of local storage. Lots of stuff.
- [x] **Frontend calls service endpoints** - All of the frontend is linked with the backend service, so it all runs as intended.
- [x] **General edits and bug fixes** - I fixed stuff like the comments section submit button and made some personal changes to the code - more will definitely come. I want to create stock lines, fix the table on the home.jsx, and change some things about the website to look it more visually appealing.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
