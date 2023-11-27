const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  recipes: [
    {
      recipe: {
        title: { type: String, required: true },
        description: {
          type: String,
          required: true
        },
        ingredients: {
          type: Array,
          required: true
        },
        category: {
          type: String,
          enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
          required: true
        },
        image: {
          type: String,
          required: true
        }
      }
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
