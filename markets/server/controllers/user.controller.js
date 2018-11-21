const User = require('mongoose').model('User');
const session = require('express-session');
const bcrypt = require('bcrypt');

const {
  Http
} = require('@status/codes');

module.exports = {
  login(request, response) {
    const {
      email,
      password
    } = request.body;

    User.findOne({
        email
      })
      .then(user => {
        try {
          return User.validatePassword(password, user.password).then(valid => {
            if (!valid) throw new Error();
            console.log('you are logged in now');
            console.log(user);
            request.session.user_id = user._id;
            completeLogin(request, response, user);
          });
        } catch (e) {
          throw new Error();
        }
      })
      .catch(() => {
        response
          .status(Http.Unauthorized)
          .json('Email/password combo not valid');
      });
  },

  register(request, response) {
    User.create(request.body)
      .then(user => {
        completeLogin(request, response, user);
      })
      .catch(error => {
        response
          .status(Http.UnprocessableEntity)
          .json(
            Object.keys(error.errors).map(key => error.errors[key].message)
          );
      });
  },
  logout(request, response) {
    request.session.destroy();
    response.clearCookie('userID');
    response.clearCookie('expiration');

    response.json(true);
  },
  // checkUser(request, response) {
  //   if (response.cookie("userID")) {
  //     console.log("user is logged in")
  //     return true
  //   }
  // },

  loggedin(request, response) {
    if (request.session.user) {

      console.log("logged in", request.session.user)
      response.json(request.session.user);
    } else {
      console.log('Not logged in.');
    }
  },
};

function completeLogin(request, response, user) {
  request.session.user = user.toObject();
  delete request.session.user.password;

  response.cookie('userID', user._id.toString());
  response.cookie('expiration', Date.now() + 86400 * 1000);

  response.json(user);
}
