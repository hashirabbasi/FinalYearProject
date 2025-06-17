const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authorizationMiddleware = require('../middlewares/auth.middleware');

// Register
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullName.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullName.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser);

// Login
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.loginUser);

// Profile
router.get('/profile', authorizationMiddleware.authUser, userController.getUserProfile);

// Logout
router.get('/logout', authorizationMiddleware.authUser, userController.logoutUser);

// Verify OTP
router.post("/verify-otp", userController.verifyOTP);

router.post("/forgetPassword", userController.forgetPassword);
router.post("/resetPassword",  userController.resetPassword);

module.exports = router;
