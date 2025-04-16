const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('service');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

// --- User authentication and management ---
async function getUser(email) {
  return db.collection('users').findOne({ email });
}

async function getUserByToken(token) {
  return db.collection('users').findOne({ token });
}

async function addUser(user) {
  return db.collection('users').insertOne(user);
}

async function updateUser(user) {
  return db.collection('users').updateOne({ email: user.email }, { $set: user });
}

async function getAllUsers() {
  return db.collection('users').find().toArray();
}

// --- User data (portfolio, balance, profile, etc) ---
async function getUserData(email) {
  // Retrieve user data document for the given email
  const userData = await db.collection('userData').findOne({ email });
  if (!userData) return null;

  // Compute net worth if portfolio exists
  let netWorth = userData.balance || 0;
  if (Array.isArray(userData.portfolio)) {
    netWorth += userData.portfolio.reduce(
      (sum, stock) => sum + (parseFloat(stock.totalValue) || 0),
      0
    );
  }

  // Return username (email), balance, netWorth, portfolio, profile, and purchases
  return {
    userName: email,
    balance: userData.balance || 0,
    netWorth,
    portfolio: userData.portfolio || [],
    profile: userData.profile || {}, // <-- profile always included
    purchases: userData.purchases || [],
  };
}

async function updateUserData(email, data) {
  // Only update the provided fields (balance, portfolio, profile, purchases)
  return db.collection('userData').updateOne(
    { email },
    { $set: { ...data, email } },
    { upsert: true }
  );
}

// --- Notifications ---
async function addNotification(notification) {
  return db.collection('notifications').insertOne(notification);
}

async function getNotifications() {
  return db.collection('notifications').find().sort({ timestamp: 1 }).toArray();
}

// --- Comments / Chat ---
async function addComment(comment) {
  return db.collection('comments').insertOne(comment);
}

async function getComments() {
  return db.collection('comments').find().toArray();
}

// --- Scores (if used) ---
async function addScore(score) {
  return db.collection('scores').insertOne(score);
}

async function getHighScores() {
  return db.collection('scores').find().sort({ netWorth: -1 }).limit(10).toArray();
}

// --- Chats (Community Chat / Comments) ---
async function addChat(chat) {
  return db.collection('chats').insertOne(chat);
}

async function getChats() {
  return db.collection('chats').find().sort({ timestamp: 1 }).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  getAllUsers,
  getUserData,
  updateUserData,
  addNotification,
  getNotifications,
  addComment,
  getComments,
  addScore,
  getHighScores,
  addChat,
  getChats,
};
