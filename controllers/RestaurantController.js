// controllers/RestaurantController.js
const Restaurant = require('../models/Restaurant');
 
 


// View all restaurants with complete information
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add a new restaurant
const addRestaurant = async (req, res) => {
  try {
    const { name, location, menu, contact } = req.body;

    const newRestaurant = new Restaurant({ name, location, menu, contact });
    await newRestaurant.save();

    res.status(201).json({ message: 'Restaurant added successfully', restaurant: newRestaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a restaurant by ID
const deleteRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json({ message: 'Restaurant deleted successfully', restaurant: deletedRestaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// View ratings of restaurants
const viewRatings = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}, 'name ratings');
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// View a particular restaurant by ID
const viewRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// View menu of a particular restaurant by ID
const viewMenuByRestaurantId = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId);
    
    console.log("here is the resturnat id from frontend "+restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const menu = restaurant.menu;
    console.log("here is the menu of one resturant ",menu);
    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getAllMenus = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ message: 'Restaurants not found' });
    }

    const menus = restaurants.map(restaurant => restaurant.menu);
    console.log("here are the menus ", menus);

    res.json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllRestaurants,
  addRestaurant,
  deleteRestaurant,
  viewRatings,
  viewRestaurantById,
  getAllMenus, // Change the function name exported here
  viewMenuByRestaurantId,
};