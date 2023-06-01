const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['base', 'advanced', 'premium'],
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);