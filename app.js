var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const session = require('express-session')

const mongodb = require('./db/mongo')
var indexRouter = require('./routes/index');


var app = express();

mongodb.initClientDbConnection()

app.use(cors({
  exposedHeaders: ['Authorization'],
  origin: '*'
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  name: "port-russell-session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 heure
  }
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// catch error 404 
app.use(function(req, res, next) {
  res.status(404).json( {name: "API", version: "1.0", status: 404, message: "not_found"} )
})


module.exports = app;
