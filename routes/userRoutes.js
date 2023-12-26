// userRoutes.js
const express = require('express');
const router = express.Router();

const {getAllUsers } = require('../controllers/UserController');
const {getCustomers,register,login } = require('../controllers/UserController');
const {getRestaurantOwners } = require('../controllers/UserController');
const {getDeliveryRiders } = require('../controllers/UserController');

 

// Get all users (only accessible to admin)
router.post('/register',  register);
router.post('/login',  login);
router.get('/all',  getAllUsers);
router.get('/customer',  getCustomers);
router.get('/rider',   getDeliveryRiders );
router.get('/owner',  getRestaurantOwners );

module.exports = router;
