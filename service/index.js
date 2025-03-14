const port = process.argv.length > 2 ? process.argv[2] : 4000;
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const authCookieName = 'token';

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// Create data structures here
let users = [];
let comments = [];
let userData = {};

// Middleware for authentication
const verifyAuth = (req, res, next) => {
    const user = users.find((u) => u.token === req.cookies[authCookieName]);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

// API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

// New user
apiRouter.post('/auth/create', async (req, res) => {
    const { email, password } = req.body;
    if (await findUser('email', email)) {
        return res.status(409).send({ msg: 'Existing user' });
    }
    const user = await createUser(email, password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
});

// Login
apiRouter.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser('email', email);
    if (user && await bcrypt.compare(password, user.password)) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    } else {
        res.status(401).send({ msg: 'Password incorrect. Please try again.' });
    }
});

// Logout
apiRouter.delete('/auth/logout', (req, res) => {
    const user = users.find((u) => u.token === req.cookies[authCookieName]);
    if (user) delete user.token;

    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Fetch user data
apiRouter.get('/user/:userName', verifyAuth, (req, res) => {
    const userName = req.params.userName;
    const data = userData[userName] || {};
    res.send(data);
});

// Fetch all users and their net worth
apiRouter.get('/leaderboard', verifyAuth, (req, res) => {
    const leaderboard = users.map(user => {
        const data = userData[user.email] || {
            balance: 100000,
            netWorth: 100000,
        };
        return {
            name: user.email.split('@')[0],
            balance: data.balance,
            netWorth: data.netWorth
        };
    });
    
    res.send(leaderboard);
});


// Update user data
apiRouter.post('/user/:userName', verifyAuth, (req, res) => {
    const userName = req.params.userName;
    userData[userName] = req.body;
    res.status(200).send(userData[userName]);
});

// Fetch comments
apiRouter.get('/comments', (req, res) => {
    res.send(comments);
});

// Post a new comment
apiRouter.post('/comments', verifyAuth, (req, res) => {
    const comment = { user: req.user.email.split('@')[0], text: req.body.text };
    comments.push(comment);
    res.status(201).send(comment);
});

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = { email, password: passwordHash, token: uuid.v4() };
    users.push(user);
    userData[email] = {
        balance: 100000,
        portfolio: [],
        purchases: [],
        netWorth: 100000,
        profile: {
            phoneNumber: '',
            fullName: '',
            yearlyIncome: '',
            riskTolerance: '',
            creationTime: new Date().toISOString(),
        },
    };
    return user;
}

async function findUser(field, value) {
    return users.find((u) => u[field] === value);
}

function setAuthCookie(res, token) {
    res.cookie(authCookieName, token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});