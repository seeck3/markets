const router = require('express').Router();
const {
  userController
} = require('../controllers')


module.exports = router
  .post('/login', userController.login)
  .post('/register', userController.register)
  .get('/loggedin', userController.loggedin)
  .delete('/logout', userController.logout);
