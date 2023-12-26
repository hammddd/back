// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  items: [
    {
      name: String,
      quantity: Number
    }
  ],
  totalPrice: Number,
  deliveryAddress: String,
  status: {
    type: String,
    enum: ['processing', 'dispatched', 'delivered'],  
    default: 'processing',},
  rider: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
