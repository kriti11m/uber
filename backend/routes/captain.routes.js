const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('Firstname is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('vehicle.color').notEmpty().withMessage('Color is required'),
    body('vehicle.plate').notEmpty().withMessage('Plate is required'),
    body('vehicle.vehicleType').notEmpty().withMessage('Type is required'),
    body('vehicle.capacity').notEmpty().withMessage('Capacity is required'),
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain);
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;