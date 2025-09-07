let posts = require('../data/posts');

const Course = require('../models/course.model')
const g etPosts = (req, res) => {
  res.json(posts);
};


const createPost = (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
};

module.exports = { getPosts, createPost };
