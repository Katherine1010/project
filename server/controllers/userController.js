// userController.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// Login Page
exports.loginPage = (req, res) => {
  res.render('login', { title: 'Login'});
};

// Logout Page
exports.logoutPage = (onLogoutCallback) => (req, res) => {
  // Set loggedIn to false
  req.session.loggedIn = false;

  if (typeof onLogoutCallback === 'function') {
    console.log('we are here..1');
    onLogoutCallback();
  }

  // Redirect to the desired logout page or homepage
  res.redirect('/');
};

// Register Page
exports.registerPage = (req, res) => {
  const loggedIn = req.session.loggedIn;
  // Pass an empty object as the second argument to provide an initial value for locals
  res.render('register', { title: 'Register', errors: [], loggedIn });
};

// Login Handler
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email and password match a user in the database
    const user = await User.findOne({ email });

    if (user) {
      // Compare the entered password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Set session variables for loggedIn and userName
        req.session.loggedIn = true;
        req.session.userName = user.username;

        //get the email from the user logging in
        const userEmail = user.email;

        // Redirect to the index page on successful login
        //
        res.redirect(`/home?userEmail=${userEmail}`);
        // console.log(user)
      } else {
        // If passwords don't match, render the login page with an error message
        res.render('login', { title: 'Login', error: 'Invalid email or password' });
      }
    } else {
      // If no user with the provided email is found, render the login page with an error message
      res.render('login', { title: 'Login', error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).render('login', { title: 'Login', error: 'An error occurred during login.' });
  }
};

// Register Handler
exports.register = [
  
  // Input validation
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Email is not valid'),
  check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),

  async (req, res) => {

    //console.log(req.body); // Log the request body to inspect the received data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, render the register view with the error messages
      return res.status(400).render('register', { title: 'Register', errors: errors.array() });
    }

    const { username, email, password, password2 } = req.body;

    // Check if passwords match
    if (password !== password2) {
      return res.status(400).render('register', { title: 'Register', errors: [{ msg: 'Passwords do not match' }] });
    }

    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });

      if (existingUser) {
        return res.status(400).render('register', { title: 'Register', errors: [{ msg: 'Username or email already exists.' }] });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      req.flash('infoSubmit', 'Registration successful. You can now log in.');
      res.redirect('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).render('register', { title: 'Register', errors: [{ msg: error.message }] });
    }
  },
];

// Other controllers if you have them...
