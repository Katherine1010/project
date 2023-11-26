// userController.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Login Page
exports.loginPage = (req, res) => {
  res.render('login', { title: 'Login' });
};

// Register Page
exports.registerPage = (req, res) => {
  // Pass an empty object as the second argument to provide an initial value for locals
  res.render('register', { title: 'Register', error: '' });
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
          // Set any session or cookie information if needed
          // For example, you might use express-session to manage sessions
  
          // Redirect to the index page on successful login
          res.redirect('/');
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
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      // Pass the error message when rendering the 'register' view
      return res.status(400).render('register', { title: 'Register', error: 'Username or email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Assuming you are using flash messages
    req.flash('infoSubmit', 'Registration successful. You can now log in.');
    res.redirect('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    // Pass the error message when rendering the 'register' view
    res.status(500).render('register', { title: 'Register', error: 'An error occurred during registration.' });
  }
};

// Other controllers if you have them...
