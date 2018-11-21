// using const Book = require('mongoose').model('Book'); instead of using mongoose and book seperate
const Post = require('mongoose').model('Post');
const User = require('mongoose').model('User');

// const Book = mongoose.model('Book');


module.exports = {
  // get all of resource
  index(request, response) {
    console.log("getting posts");
    console.log(request.session.user_id);
    Post.find({})
      .then(posts => response.json(posts))
      .catch(console.log)
  },

  // get a single resource
  show(request, response) {
    Post.findById(request.params.post_id)
      .then(post => response.json(post))
      .catch(console.log)
  },

  // create resource
  // create(request, response) {
  //   Post.create(request.body)
  //     .then(post => response.json(post))
  //     .catch(error => {
  //       const errors = Objest.keys(error.errors).map(key => error.errors[key].message)

  //       response.status(402).json(errors);
  //     });
  // },
  create(request, response) {
    console.log('creating post', request.session.user_id);
    if (!request.session.user_id) return response.json({
      message: "You must be logged in to create a post!",
      errors: "You must be logged in to create a post!"
    });

    let posting = new Post(request.body);

    posting.users = request.session.user_id;
    console.log(posting, "posting");
    posting.save(err => {

      if (err) return response.json({
        message: "Failed to save posting",
        errors: err
      });

      else {

        User.findOne({
          _id: request.session.user_id
        }, (err, user) => {
          console.log(user);
          if (user) {

            user.posts.push(posting._id);

            user.save(err => {

              if (err) return response.json({
                message: "Failed to find user!",
                error: err
              });

              else {

                console.log("CREATED LISTING");

                return response.json(posting);

              }

            });

          } else return response.json({
            message: "Failed to find user!",
            error: err
          });

        });

      }

    });

  },

  // update resource
  update(request, response) {
    Post.findByIdAndUpdate(request.params.post_id, request.body, {
        new: true
      })
      .then(post => response.json(post))
      .catch(console.log)
  },

  contact(request, response) {
    // console.log(request.params.post_id);
    Post.findById(request.params.post_id)
      .then(contact => {
        console.log(contact.users);
        User.findById(contact.users)
          .then(contactUser => {
            console.log("contactUser ====", contactUser);
            response.json(contactUser);
          })

      })
  },

  // delete/remove resource
  destroy(request, response) {
    Post.findByIdAndRemove(request.params.post_id)
      .then(post => response.json(post))
      .catch(console.log)
  },


};
