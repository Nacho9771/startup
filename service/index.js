const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const { WebSocketServer } = require('ws');
const { getUserData, updateUserData } = require('./database.js');
const { addNotification, getNotifications } = require('./database.js');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

const wss = new WebSocketServer({ noServer: true });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    if (message.type === 'trade') {
      broadcastTrade(message); // Broadcast trade to all clients
    }
    if (message.type === 'requestStockUpdates') {
      // Simulate stock updates
      const stockUpdate = {
        type: 'stockUpdate',
        ticker: 'AAPL',
        price: (Math.random() * 1000).toFixed(2),
      };
      for (const client of clients) {
        if (client.readyState === 1) {
          client.send(JSON.stringify(stockUpdate));
        }
      }
    } else {
      const chat = message;
      for (const client of clients) {
        if (client.readyState === 1) {
          client.send(JSON.stringify(chat));
        }
      }
    }
  });

  ws.on('close', () => clients.delete(ws));
});

// Broadcast trades and notifications
function broadcastTrade(trade) {
  const tradeMessage = { type: 'trade', ...trade };
  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(tradeMessage));
    }
  }
}

function broadcastNotification(message) {
  const notification = { type: 'notification', message, timestamp: new Date() };
  addNotification(notification); // Save notification to the database
  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(notification));
    }
  }
}

app.server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    await DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GetScores
apiRouter.get('/scores', verifyAuth, async (req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', verifyAuth, async (req, res) => {
  const scores = await updateScores(req.body);
  res.send(scores);
});

// Fetch comments
apiRouter.get('/comments', async (req, res) => {
  const comments = await DB.getComments();
  res.send(comments);
});

// Post a new comment
apiRouter.post('/comments', verifyAuth, async (req, res) => {
  const comment = {
    user: req.user.email.split('@')[0],
    text: req.body.text,
  };
  await DB.addComment(comment);

  // Broadcast the new comment to all connected WebSocket clients
  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(comment));
    }
  }

  res.status(201).send(comment);
});

// Fetch user data
apiRouter.get('/user/:email', verifyAuth, async (req, res) => {
  const email = req.params.email;
  const userData = await getUserData(email);
  if (userData) {
    res.send(userData); // Include purchases in the response
  } else {
    res.status(404).send({ msg: 'User not found' });
  }
});

// Update user data
apiRouter.post('/user/:email', verifyAuth, async (req, res) => {
  const email = req.params.email;
  const { balance, portfolio, purchases } = req.body;

  try {
    await updateUserData(email, { balance, portfolio, purchases }); // Save purchases to the backend
    res.status(200).send({ msg: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).send({ msg: 'Failed to update user data' });
  }
});

// API endpoint to fetch notifications
apiRouter.get('/notifications', async (req, res) => {
  try {
    const notifications = await getNotifications();
    res.json(notifications); // Ensure the response is valid JSON
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ msg: 'Failed to fetch notifications' }); // Return error as JSON
  }
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function updateScores(newScore) {
  await DB.addScore(newScore);
  return DB.getHighScores();
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

module.exports = { broadcastTrade, broadcastNotification };