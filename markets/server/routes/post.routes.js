const postController = require('../controllers/post.controller');
const userController = require('../controllers/user.controller');
const router = require('express').Router();

//    /resource/:id   => after index.js it goes to /books/:id
// and /api/books/:id

module.exports = router
  .get('/', postController.index)
  .post('/new', postController.create)
  .get('/:post_id', postController.show)
  .get('/:post_id/contact', postController.contact)
  .put('/:post_id', postController.update)
  .delete('/:post_id', postController.destroy)
