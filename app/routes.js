var User = require('./models/user');

module.exports = function(app, passport){
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
		//console.log('111111');
		res.render('index.ejs', { message: req.flash('signupMessage') });
	});


	app.post('/', passport.authenticate('local-signup', {
		successRedirect: '/create',
		failureRedirect: '/',
		failureFlash: true
	}));

	app.get('/create', isLoggedIn, function(req, res){
		res.render('createprofile.ejs', { user: req.user });
	});

	app.post('/create', function(req, res){
		console.log('is there a user? ' + req.user);
		User.findOne({'general.email':req.user.email, 'general.password':req.user.password}, function(err, user){
		 	if(err){
		 		throw err;
		 	}
		 	if(user){
		 		console.log('user exists');
		 		console.log('the age is ' + req.body.age);
		 		user.personal.age = req.body.age;
		 		user.personal.current_city = req.body.city;
		 		user.save(function(err){
		 			if(err)
						throw err;
					return done(null, newUser);
				});
		 	}
		 });
		res.redirect('/profile');
	});


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