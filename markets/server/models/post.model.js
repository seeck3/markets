const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'You must type title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'You must describe your bicycle']
  },
  price: {
    type: Number,
    required: [true, 'You must enter price $$$']
  },
  location: {
    type: String,
    required: [true, 'You must type your location']
  },
  photo: String,
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);
