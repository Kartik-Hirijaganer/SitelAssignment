const mongoose = require('mongoose');

mongoose.model('user', {
	userId: String,
	name: String,
    email: String,
	dob: String
});
