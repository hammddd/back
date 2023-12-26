const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'your_secret_key';

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user with the hashed password and role
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid email' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log('Incorrect password for user:', email);
      return res.status(401).json({ message: 'Invalid password' });
    }

    console.log('User logged in successfully:', email);

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email'); // Only select necessary fields
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }, 'username email');
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRestaurantOwners = async (req, res) => {
  try {
    const restaurantOwners = await User.find({ role: 'restaurantOwner' }, 'username email');
    res.json(restaurantOwners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getDeliveryRiders = async (req, res) => {
  try {
    const deliveryRiders = await User.find({ role: 'deliveryRider' }, 'username email');
    res.json(deliveryRiders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


 


module.exports = {
  register,
  login,
  getAllUsers,
  getCustomers,
  getRestaurantOwners,
  getDeliveryRiders,
};

 
