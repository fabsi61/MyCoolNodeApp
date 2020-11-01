const express = require('express');

const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');
const usersRouter = require('../Routes/users-routes');
const authRouter = require('../auth/auth-routes');
const restricted = require('../auth/restricted-middleware');

const session = require('express-session');
const server = express();

server.use(express.json());

const sessionConfig = {
    name: 'monster',    // name of the cookie
    secret: process.env.SECRET,     // secret that makes the cookie effective
    cookie: {
        maxAge: 1000 * 60 * 60, // time span of the cookie
        secure: false, // for production set to true for https only access
        httpOnly: true //true means no acces from javascript

    },
    resave: false,
    saveUninitialized: true,//GDPR laws must be false in production
}

server.use(session(sessionConfig));

server.get('/', (req, res) => {
    res.json({message: 'I am index page'});
});
server.use('/api/auth', authRouter);
server.use('/api/lessons',restricted, lessonsRouter);
server.use('/api/messages',restricted, messagesRouter);
server.use('/api/users', restricted, usersRouter);

module.exports = server;