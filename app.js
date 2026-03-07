const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const session = require('express-session')
const mongodb = require('./db/mongo')
const indexRouter = require('./routes/index.routes');
const apiRouter = require('./routes/api.routes')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger.config')


const app = express();

mongodb.initClientDbConnection()

app.use(cors({
  exposedHeaders: ['Authorization'],
  origin: '*'
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(session({
  name: "port-russell-session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 heures
  }
}))

app.use(express.static(path.join(__dirname, 'public')));
//app.use('/docs', express.static(path.join(__dirname, 'docs')));

app.use('/', indexRouter);
app.use('/api', apiRouter);


app.use(function(req, res, next) {
  res.status(404).json({ 
    name: "API", 
    version: "1.0", 
    status: 404, 
    message: "not_found" 
  })
})


module.exports = app;
