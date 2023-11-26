const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  recipes: [
    {
      user_recipe_id: { type: String, required: true },
      recipe: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        description: {
          type: String,
          required: true
        },
        email: {
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
