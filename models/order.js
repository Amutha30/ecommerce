const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
