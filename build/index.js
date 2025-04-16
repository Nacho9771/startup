const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const { WebSocketServer } = require('ws'); // --- WEBSOCKET ---
const { getUserData, updateUserData } = require('./database.js');
const { addNotification, getNotifications } = require('./database.js');
const { addComment, getComments } = require('./database.js'); // Import comment functions
const fs = require('fs');
const http = require('http'); // Replace https with http
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Replace HTTPS server with HTTP server
const server = http.createServer(app); // Use HTTP server instead of HTTPS

const clients = new Set(); // --- WEBSOCKET ---

// --- WebSocket server setup for /ws endpoint --- // --- WEBSOCKET ---
const wss = new WebSocketServer({ noServer: true }); // --- WEBSOCKET ---

// Heartbeat function for each ws connection
function heartbeat() {
  this.isAlive = true;
}

// Handle upgrade requests for /ws only // --- WEBSOCKET ---
server.on('upgrade', (request, socket, head) => {
  if (request.url === '/ws') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});
// --- END WEBSOCKET ---

// --- Consolidated WebSocket logic --- // --- WEBSOCKET ---
wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', heartbeat);

  clients.add(ws);

  // Broadcast connection announcement
  broadcastToAll({
    type: 'notification',
    message: 'A user has connected to the server.',
    timestamp: new Date(),
  });

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data);

      // Handle chat messages
      if (message.type === 'chat') {
        const chat = {
          type: 'chat',
          user: message.user,
          text: message.text,
          timestamp: new Date(),
        };
        await addComment(chat);
        broadcastToAll(chat);
      }

      // Handle notification messages (e.g., stock purchase/sale)
      else if (message.type === 'notification') {
        const notification = {
          type: 'notification',
          message: message.message,
          timestamp: new Date(),
        };
        await addNotification(notification);
        broadcastToAll(notification);
      }

      // Handle trade messages (if needed)
      else if (message.type === 'trade') {
        broadcastToAll({ type: 'trade', ...message });
      }

      // Add more message types as needed

    } catch (error) {
      console.error('Error handling WebSocket message:', error);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    clients.delete(ws);
    console.error('WebSocket error:', error);
  });
});

// Ping all clients every 30 seconds to keep connections alive
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      ws.terminate();
      return;
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', function close() {
  clearInterval(interval);
});
// --- END WEBSOCKET ---

// Helper to broadcast to all connected clients // --- WEBSOCKET ---
function broadcastToAll(obj) {
  const msg = JSON.stringify(obj);
  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(msg);
    }
  }
}
// --- END WEBSOCKET ---

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
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
  broadcastToAll(comment); // --- WEBSOCKET ---

  res.status(201).send(comment);
});

// Fetch user data (GET /api/user?email=...)
apiRouter.get('/user', verifyAuth, async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).send({ msg: 'Missing email parameter' });
  }
  let userData = await getUserData(email);

  // If userData exists but balance is 0 or missing, and portfolio is empty, set balance to 100000
  if (userData && (!userData.balance || userData.balance === 0) && (!userData.portfolio || userData.portfolio.length === 0)) {
    await updateUserData(email, { balance: 100000 });
    userData = await getUserData(email);
  }

  if (userData) {
    res.send(userData); 
  } else {
    // If userData does not exist, create a new userData with 100000 balance
    await updateUserData(email, { balance: 100000, portfolio: [], purchases: [], profile: {}, email });
    const newUserData = await getUserData(email);
    res.send(newUserData);
  }
});

// Update user data (POST /api/user)
apiRouter.post('/user', verifyAuth, async (req, res) => {
  const { balance, portfolio, profile, purchases, email } = req.body;

  if (!email) {
    return res.status(400).send({ msg: 'Missing email in request body' });
  }

  try {
    // Always update all fields provided, including purchases and email
    const updatedData = {
      balance,
      portfolio,
      profile,
      purchases,
      email, // Ensure email is included in the update data
    };

    await updateUserData(email, updatedData); 

    // Return the updated user data
    const userData = await getUserData(email);
    res.status(200).send({ msg: 'User data updated successfully', updatedData: userData });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).send({ msg: 'Failed to update user data' });
  }
});

// --- Add endpoints for profile-specific GET/POST ---
// GET user profile (GET /api/user/:email)
apiRouter.get('/user/:email', verifyAuth, async (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(400).send({ msg: 'Missing email parameter' });
  }
  const userData = await getUserData(email);
  if (userData) {
    res.send(userData);
  } else {
    res.status(404).send({ msg: 'User not found' });
  }
});

// POST update user profile (POST /api/user/:email)
apiRouter.post('/user/:email', verifyAuth, async (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(400).send({ msg: 'Missing email parameter' });
  }
  // Only update provided fields
  const { balance, portfolio, profile, purchases } = req.body;
  try {
    const updateFields = {};
    if (balance !== undefined) updateFields.balance = balance;
    if (portfolio !== undefined) updateFields.portfolio = portfolio;
    if (purchases !== undefined) updateFields.purchases = purchases;
    updateFields.email = email;

    // Merge profile fields carefully: only update fields that are not empty string or null
    if (profile !== undefined) {
      // Fetch the current user data to merge profile fields
      const currentUserData = await getUserData(email);
      const currentProfile = (currentUserData && currentUserData.profile) || {};
      const mergedProfile = { ...currentProfile };

      for (const key in profile) {
        if (
          profile[key] !== undefined &&
          profile[key] !== '' &&
          profile[key] !== null
        ) {
          mergedProfile[key] = profile[key];
        }
      }
      updateFields.profile = mergedProfile;
    }

    await updateUserData(email, updateFields);

    // Return the updated user data
    const userData = await getUserData(email);
    res.status(200).send({ msg: 'User data updated successfully', updatedData: userData });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).send({ msg: 'Failed to update user profile' });
  }
});

// API endpoint to fetch notifications
apiRouter.get('/notifications', verifyAuth, async (req, res) => {
  try {
    const notifications = await getNotifications();
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ msg: 'Failed to fetch notifications' });
  }
});

// API endpoint to fetch chat messages
apiRouter.get('/chats', verifyAuth, async (req, res) => {
  try {
    const chats = await getComments();
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ msg: 'Failed to fetch chats' });
  }
});

// API endpoint to fetch all users
apiRouter.get('/users', verifyAuth, async (req, res) => {
  try {
    const users = await DB.getAllUsers(); 
    res.json(users.map((user) => ({ email: user.email }))); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ msg: 'Failed to fetch users' });
  }
});

app.use(function (err, req, res, next) {
  console.error('Unhandled error:', err); 
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: './public' }); 
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

module.exports = { broadcastToAll }; // --- WEBSOCKET ---