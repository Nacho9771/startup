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

// Fetch comments
apiRouter.get('/comments', (req, res) => {
    res.send(comments);
});

// Add a new comment
apiRouter.post('/comments', (req, res) => {
    const { user, text } = req.body;
    if (!user || !text) {
        return res.status(400).send({ msg: 'User and text are required' });
    }
    const newComment = { user, text };
    comments.push(newComment);
    comments = comments.slice(-10);
    res.status(201).send(newComment);
});

// Middleware for authentication
const verifyAuth = (req, res, next) => {
    const user = users.find((u) => u.token === req.cookies[authCookieName]);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).send({ msg: 'Password incorrect. Please try again.' });
    }
};

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = { email, password: passwordHash, token: uuid.v4() };
    users.push(user);
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