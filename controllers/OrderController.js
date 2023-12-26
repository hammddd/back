
// controllers/OrderController.js
const Order = require('../models/Order');

// Add a new order
const addOrder = async (req, res) => {
  try {
    const { userId, restaurantId, items, totalAmount, status } = req.body;

    const newOrder = new Order({ userId, restaurantId, items, totalAmount, status });
    await newOrder.save();

    res.status(201).json({ message: 'Order added successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// View all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  updateOrderStatus,
};
