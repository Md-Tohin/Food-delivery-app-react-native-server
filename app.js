var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authenticationRouter = require('./routes/authentication');
var restaurantRouter = require('./routes/restaurant.route');
var userRouter = require('./routes/user.route');
var cartRouter = require('./routes/cart.route');
var bookmarkRouter = require("./routes/bookmark.route");
var foodRouter = require("./routes/food.route");
var orderRouter = require("./routes/order.route");

const MongoDB  = require('./services/mongodb.service');
const tokenVerification = require('./services/authentication.service').tokenVerification;

MongoDB.connectToMongoDB();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('static'));

// Public routes (NO token required)
app.use('/', indexRouter);
app.use('/api', authenticationRouter);  // /login, /register

// Protected routes (Token required)
app.use(tokenVerification);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use("/api/bookmark", bookmarkRouter);
app.use("/api/food", foodRouter);
app.use("/api/order", tokenVerification, orderRouter);

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;