var user = require('./models/user');

module.exports = module.exports = function(app, passport){
	// app.get('/', function(req, res){
	// 	res.render('index.ejs');
	// });

	app.get('/login', function(req, res){
		res.render('login.ejs', {message : req.flash('loginMessage')});
	});
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/', function(req, res){
		console.log('111111');
		res.render('index.ejs', { message: req.flash('signupMessage') });
	});


	app.post('/', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/',
		failureFlash: true
	}));

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', { user: req.user });
	});

	app.get('/itinerary', function(req, res) {
     // ejs render automatically looks in the views folder
      res.render('itinerary1.ejs');
    });
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
};
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/');
}