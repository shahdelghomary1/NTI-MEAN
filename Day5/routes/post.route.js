const express = require('express');
const { getPosts, createPost } = require('../controllers/post.controller');
const { validatePost } = require('../middlewares/validation');

const router = express.Router();

router.get('/', getPosts);
router.post('/', validatePost, createPost);

module.exports = router;
