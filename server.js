/**Constants */
const { PORT } = require('./util/constant');

/**Requires */
const express = require('express');
const mongoose = require('mongoose');
require('./db/schema/userSchemaModel');
const connectDB = require('./db/mongoose');
const validateUserData = require('./util/utilValidation');

const app = express();

app.use(express.json());

/** mongoose */
connectDB();
const user = mongoose.model('user');

app.get('/users/:userId', async (req, res) => {
	const userId = req.params.userId;
	try {
		const result = await user.findOne({ userId: userId });
		res.status(200).send(result);
	} catch (error) {
		const errorDetails = JSON.stringify({
			message: `User for userId ${req.params.userId} not found.`,
			error,
		})
		res.status(400).send(errorDetails);
	}
});

app.post('/users', async (req, res) => {
	try {
		const validatedUser = validateUserData(req.body);
		const newUser = new user(validatedUser);
		await newUser.save();
		const response = JSON.stringify({
			success: true,
			message: `New user ${validatedUser.userId} successfully added in database`
		})
		res.status(200).send(response);
	} catch (error) {
		const errorDetails = JSON.stringify({
			error,
			message: 'Failed to insert user data'
		})
		res.status(400).send(errorDetails);
	}
});

app.delete('/users/:userId', async (req, res) => {
	const userId = req.params.userId;
	if (!userId) {
		res.status(400).send(JSON.stringify({message: 'Request should have an user id'}));
	}

	try {
		await user.deleteOne({ userId: userId });
		const response = JSON.stringify({
			success: true,
			message: 'User data successfully deleted'
		})
		res.status(200).send(response);
	} catch (error) {
		const errorDetails = JSON.stringify({
			message: 'Failed to delete user data',
			error,
		});
		res.status(400).send(errorDetails);
	};
})

app.listen(PORT, () => {
	console.log(`Listening to port: ${PORT}`);
});

module.exports = app;