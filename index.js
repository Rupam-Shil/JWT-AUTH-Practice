const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});
mongoose.connection
	.once('open', () => {
		console.log('DB connected');
	})
	.on('error', () => {
		console.log('error occured');
	});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hola');
});

app.use('/auth', authRoute);
app.use('/post', postRoute);

app.listen(9000, () => {
	console.log('now running on port 9000');
});
