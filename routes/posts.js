const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const checkAuth = require('../middleware/checkAuth');

router.get('/public', async (req, res) => {
	const publicPost = await Posts.find({ type: 'public' });
	res.json(publicPost);
});
router.get('/private', checkAuth, async (req, res) => {
	const publicPost = await Posts.find({ type: 'private' });
	res.json(publicPost);
});

module.exports = router;
