const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes= require('./routes/orderRoutes');
const { getAllMenus } = require('./controllers/RestaurantController');

const app = express();
const PORT = 3000;

app.use(cors()); // Allow all origins - Less secure, for development only

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect("mongodb://0.0.0.0:27017/final", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Event listeners for MongoDB connection status
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

app.use('/users', userRoutes);
app.use('/res', restaurantRoutes);
app.use('/order', orderRoutes);

app.get('/menus', getAllMenus);

app.get('/', (req, res) => {
  res.send('Welcome to the root of the server!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
