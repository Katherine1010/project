const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const userController = require('../controllers/userController');
/**
 * App Routes 
*/
router.get('/', userController.loginPage);
router.patch('/recipe/:id', recipeController.updateRecipeOnPost)
router.post('/recipe/:id', recipeController.updateRecipeOnPost);
router.get('/recipe/:id', recipeController.exploreRecipe);
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);
router.delete('/recipe/:id', recipeController.deleteRecipe);

// Dashboard
router.get('/home', recipeController.homepage);

// Login Page
router.get('/login', userController.loginPage);
router.post('/login', userController.login);

// Register Page
router.get('/register', userController.registerPage);
router.post('/register', userController.register);

// Login and Register Handlers
router.post('/login', userController.loginPage);
router.post('/register', userController.register);

 
module.exports = router;