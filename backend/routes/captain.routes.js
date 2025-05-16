const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('Firstname is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('vehicle.color').notEmpty().withMessage('Color is required'),
    body('vehicle.plate').notEmpty().withMessage('Plate is required'),
    body('vehicle.vehicleType').notEmpty().withMessage('Type is required'),
    body('vehicle.capacity').notEmpty().withMessage('Capacity is required'),
], captainController.registerCaptain);

module.exports = router;