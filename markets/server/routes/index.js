const postRouter = require('./post.routes');
const userRouter = require('./user.routes');
const router = require('express').Router();

module.exports = router
  .use('/user', userRouter)
  .use('/markets', postRouter)
