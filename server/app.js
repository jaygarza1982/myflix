var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var filesRouter = require('./routes/api/files');
var videoUtilsRouter = require('./routes/api/video-utils');
var authRouter = require('./routes/api/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use('/', indexRouter);
app.use('/api/files', filesRouter);
app.use('/api/video-utils', videoUtilsRouter);
app.use('/api/auth', authRouter);

module.exports = app;
