const express = require('express');
const router = express.Router();
const { registerController, loginController, testController, forgotPasswordController } = require('../controller/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware'); // Correct import statement

// REGISTER || method post
router.post('/register', registerController);

// LOGIN || method post
router.post('/login', loginController);

// Forgot Password || post
router.post('/forgotpassword', forgotPasswordController);


// Test route with requireSignIn middleware
router.get('/test', requireSignIn, isAdmin, testController);

// protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

// protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})
module.exports = router;
