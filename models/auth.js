const mongoose = require('mongoose');
const { Schema } = mongoose;

const authSchema = new Schema({
	email: {
		type: 'string',
		required: true,
	},
	password: {
		type: 'string',
		required: true,
	},
});

const Auth = mongoose.model('auths', authSchema);
module.exports = Auth;
