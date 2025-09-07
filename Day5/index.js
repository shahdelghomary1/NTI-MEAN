const express = require('express');
const postRouter = require('./routes/post.route');
const connection = require('./database/connection');
const app = express();

app.use(express.json());
const mongoose = require('mongoose');

app.use('/api/posts', postRouter);


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
