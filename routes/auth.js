const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Auth = require('../models/auth');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

router.post(
	'/',
	[
		check('email', 'Please Provide a valid email').isEmail(),
		check(
			'password',
			'Please Provide a password more than 5 character'
		).isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const { email, password } = req.body;

		//VALIDATE THE INPUT

		const errors = validationResult(req);

		if (errors.isEmpty()) {
			//VALIDATE IF USER DOESNT ALREADY EXIST OR NOT

			const user = await Auth.findOne({ email: email });
			if (user) {
				const passwordMatched = await bcrypt.compare(password, user.password);
				//checking for password
				if (passwordMatched) {
					console.log('Password Matched');
				} else {
					console.log('Wrong password');
				}
				res.status(400).json({
					errors: [
						{
							msg: 'User already exist',
						},
					],
				});
			} else {
				let hashedPassword = await bcrypt.hash(password, 10);
				let newUser = new Auth({
					email: email,
					password: hashedPassword,
				});
				newUser = await newUser.save();

				const token = await JWT.sign({ email }, 'sdfsdfdf', {
					expiresIn: 360000,
				});

				res.json({ token });
			}
		} else {
			res.status(400).json({ errors: errors.array() });
		}
	}
);

router.post('/login', async (req, res) => {
	const { password, email } = req.body;
	let user = await Auth.findOne({ email: email });
	if (!user) {
		res.status(400).json({
			errors: [
				{
					msg: 'Invalid Credentials',
				},
			],
		});
	}

	const isMatched = await bcrypt.compare(password, user.password);
	if (!isMatched) {
		res.status(400).json({
			errors: [
				{
					msg: 'Invalid Credentials',
				},
			],
		});
	}

	const token = await JWT.sign({ email }, 'sdfsdfdf', {
		expiresIn: 360000,
	});

	res.json({ token });
});

router.get('/all-users', async (req, res) => {
	const allUser = await Auth.find({});
	res.json(allUser);
});

module.exports = router;
