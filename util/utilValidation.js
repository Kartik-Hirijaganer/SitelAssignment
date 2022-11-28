/**
 * Requires
 */
const uuid = require('uuid');
const Validator = require('jsonschema').Validator;
const v = new Validator();


const schema = {
	id: '/users',
	type: 'object',
	required: ['name', 'email', 'dob'],
	properties: {
		name: { type: 'string' },
		email: { type: 'string' },
        dob: { type: 'string'}
	}
};

const validateUserData = (data) => {
	const validationResult = v.validate(data, schema);
	if (validationResult.errors.length === 0) {
		return {
            userId: uuid.v1(),
            ...data
        };
	} else {
		throw new Error('Invalid event');
	}
};

module.exports = validateUserData;
