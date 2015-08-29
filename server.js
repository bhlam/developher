var express = require('express');
var app = express();
var mongoose = require('mongoose');
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGOLAB_URI, function(err){
	if(err){
		throw err;
	}
});
// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/views'));

// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});

app.get('/profile', function(req, res){
	res.render('profile');
})

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});