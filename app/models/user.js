var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	general: {
		email: String,
		password: String
	},
	personal:{
		name: String,
		age: Number,
		current_city: String
	},
	itinery:{
		day_1:{
			text: String,
			text2: String
		},
		day_2:{
			text: String,
			text2: String
		},
		day_3:{
			text: String,
			text2: String
		}
	},
	blog: String
});

module.exports = mongoose.model('user', userSchema);