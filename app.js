var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var serveStatic = require( "serve-static" );
var passport = require('passport');
var Strategy = require('passport-local').Strategy;



/**
 * import 라우터들
 */
var index = require('./routes/index');
var users = require('./routes/users');
var personRouter = require('./routes/proverbRouter');
var shoesRouter = require('./routes/shoesRouter');

var loginRouter = require('./routes/loginRouter');
var mobileRouter = require('./routes/mobileRouter');

var config = require('./config')();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(fileUpload());
app.use('/upload', serveStatic('c:\\upload'));


//#####################################################
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret: 'keyboard cat', resave: false, saveUninitialized: false}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//#################################################
//################# route use #####################
//#################################################
app.use('/', index);
app.use('/users', users);
app.use('/', personRouter);
//loginRouter
app.use('/', loginRouter);
app.use('/', mobileRouter);
app.use('/', shoesRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});







module.exports = app;
