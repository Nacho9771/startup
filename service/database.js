const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('service');
const userCollection = db.collection('users');
const scoreCollection = db.collection('scores');
const commentCollection = db.collection('comments');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

async function getUser(email) {
  return userCollection.findOne({ email });
}

async function getUserByToken(token) {
  return userCollection.findOne({ token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function addScore(score) {
  return scoreCollection.insertOne(score);
}

async function getHighScores() {
  const query = { netWorth: { $gt: 0 } };
  const options = {
    sort: { netWorth: -1 },
    limit: 10,
  };
  const cursor = userCollection.find(query, options);
  return cursor.toArray();
}

async function getComments() {
  const options = {
    sort: { _id: -1 }, // Sort by most recent comments
    limit: 10,         // Limit to the last 10 comments
  };
  const cursor = commentCollection.find({}, options);
  return cursor.toArray();
}

async function addComment(comment) {
  await commentCollection.insertOne(comment);
}

async function getUserData(email) {
  const user = await getUser(email);
  if (!user) return null;

  return {
    balance: user.balance || 100000,
    portfolio: user.portfolio || [],
    purchases: user.purchases || [], // Include purchases
  };
}

async function updateUserData(email, data) {
  const updateFields = {};
  if (data.balance !== undefined) updateFields.balance = data.balance;
  if (data.portfolio !== undefined) updateFields.portfolio = data.portfolio;
  if (data.purchases !== undefined) updateFields.purchases = data.purchases; // Save purchases

  await userCollection.updateOne({ email }, { $set: updateFields });
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addScore,
  getHighScores,
  getComments,
  addComment,
  getUserData,
  updateUserData,
};