const mongoose = require('mongoose');

// Embedded sub-document for menu items such as name, price, and category
const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  menu: [menuSchema], // Embed the menu schema as an array
  contact: { type: String, required: true },
  ratings: { type: Number, default: 0 }, // You can modify this based on your rating system
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
