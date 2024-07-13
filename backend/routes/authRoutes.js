const express = require('express');
const router = express.Router();
const { registerController, loginController, testController } = require('../controller/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware'); // Correct import statement

// REGISTER || method post
router.post('/register', registerController);

// LOGIN || method post
router.post('/login', loginController);

// Test route with requireSignIn middleware
router.get('/test', requireSignIn, isAdmin, testController);

module.exports = router;
