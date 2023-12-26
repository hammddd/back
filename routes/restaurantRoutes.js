const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  addRestaurant,
  deleteRestaurant,
  viewRatings, viewAllMenus,
  viewRestaurantById,viewMenuByRestaurantId, 
} = require('../controllers/RestaurantController');

// View all restaurants with complete information
router.get('/', getAllRestaurants);

// Add a new restaurant
router.post('/', addRestaurant);

// Delete a restaurant by ID
router.delete('/:id', deleteRestaurant);

// View ratings of restaurants
router.get('/ratings', viewRatings);

// View a particular restaurant by ID
router.get('/:id', viewRestaurantById);
 

router.get('/:id/menu', viewMenuByRestaurantId);


module.exports = router;
