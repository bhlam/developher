var express = require('express');
var app = express();
var mongoose = require('mongoose');
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

var url = process.env.MONGOLAB_URI || 'mongodb://localhost/test';

// mongoose.connect(url, function(err){
//  	if(err){
//  		throw err;
//  	}
// });

require('./config/passport')(passport);

//app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); 
// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
// app.get('/', function(req, res) {

//     // ejs render automatically looks in the views folder
//     res.render('index');
// });

// // set the home page route
// app.get('/itinerary', function(req, res) {
//     // ejs render automatically looks in the views folder
//     res.render('itinerary1');
// });

// app.get('/profile', function(req, res){
// 	res.render('profile');
// })

require('./app/routes.js')(app, passport);

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});