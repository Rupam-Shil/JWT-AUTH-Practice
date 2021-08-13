const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
	title: String,
	content: String,
	type: String,
});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;
