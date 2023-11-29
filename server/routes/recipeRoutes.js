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
router.get('/home',  recipeController.homepage, (req, res) =>{
    const userEmail = req.query.userEmail;
    res.send(userEmail);
});

// Login Page
router.get('/login', userController.loginPage);
router.post('/login', userController.login);

// Logout Page
// router.get('/logout', userController.logoutPage);

router.get('/logout', userController.logoutPage(async () => {
    // Update userLogedIn when the user logs out
    
    // console.log(recipeController.userLogedIn.userEmail);
    // console.log('current: ' + recipeController.userLogedIn);
    recipeController.userLogedIn = null;    
    // console.log('current: ' + recipeController.userLogedIn);
  }));

// Register Page
router.get('/register', userController.registerPage);
router.post('/register', userController.register);

// Login and Register Handlers
router.post('/login', userController.loginPage);
router.post('/register', userController.register);

// Profile Page
router.get('/profile', (req, res) => {
    // Check if the user is logged in
    if (req.session.loggedIn) {
      res.render('profile', {
        title: 'La Cucina Felice - Profile',
        userName: req.session.userName,
        userEmail: req.session.userEmail, // Add additional user details as needed
      });
    } else {
      // Redirect to the login page if the user is not logged in
      res.redirect('/login');
    }
  });
 
module.exports = router;