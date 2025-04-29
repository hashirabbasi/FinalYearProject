const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');

// Register route
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullName.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullName.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser);

// Login route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.loginUser);

//profile route
router.get('/profile', userController.getUserProfile);
module.exports = router;
