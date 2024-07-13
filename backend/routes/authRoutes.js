const express = require('express');
const { registerController, loginController } = require('../controller/authController');
const router = express.Router();

// REGISTER || method post
router.post('/register', registerController)

// LOGIN || method post
router.post('/login', loginController)
module.exports = router;