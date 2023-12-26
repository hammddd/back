// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  addOrder,
  updateOrderStatus
} = require('../controllers/OrderController');

// View all orders
router.get('/', getAllOrders);

// Add a new order
router.post('/', addOrder);

// Update order status
router.put('/:id', updateOrderStatus);

module.exports = router;
