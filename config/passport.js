var LocalStrategy = require('passport-local').Strategy;


var User            = require('../app/models/user');

module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		console.log('The email is: '+ email);
		console.log('the password is: ' + password);
		process.nextTick(function(){
			User.findOne({'general.email': email}, function(err, user){
				console.log('is there any user? ' + user);
				if(err){
					console.log('There is an error');
					return done(err);
				}
				if(user){
					console.log('why here??????');
					return done(null, false, req.flash('signupMessage', 'That email already taken'));
				}
				else{
					console.log('123The email is: '+ email);
					var newUser = new User();
					console.log('123The email is: '+ email);
					console.log('123the name is: ' + req.body.name);
					newUser.personal.name = req.body.name;
					newUser.general.email = email;
					newUser.general.password = password;

					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				}
			})

		});
	}));

	passport.use('local-login', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done){
			process.nextTick(function(){
				console.log('email is ' + email);
				console.log('password is ' + password);
				User.findOne({'general.email': email}, function(err, user){
					console.log('user is ' + user);
					if(err)
						return done(err);
					if(!user){
						console.log('yes');
						return done(null, false, req.flash('loginMessage', 'No User found'));
					}
					if(user.general.password !== password){
						return done(null, false, req.flash('loginMessage', 'invalid password'));
					}
					return done(null, user);

				});
			});
		}
	));


};