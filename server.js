const mongoose = require('mongoose');
const express = require('express'); // ✅ Add this line
const path = require('path');
const app = express();
const PORT = 3000;

// ✅ Connect to MongoDB (Compass)
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB (Compass)');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ User Model
const User = require('./models/user');
const Order = require('./models/order');


// ✅ Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Serve static files
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// ✅ Page Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

// ✅ Register Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.redirect('/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.redirect('/products');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Login error');
  }
});
app.post('/checkout', async (req, res) => {
  const { username, cart } = req.body;

  try {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const newOrder = new Order({
      username,
      items: cart,
      total
    });

    await newOrder.save();
    res.status(200).send('✅ Order placed successfully!');
  } catch (err) {
    console.error('❌ Error saving order:', err);
    res.status(500).send('Failed to place order');
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
