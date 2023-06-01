const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const Subscription = require('../models/Subscription');

exports.processPayment = async (req, res) => {
  try {
    const { userId, subscriptionId, token } = req.body;

    // Find the user and the subscription
    const user = await User.findById(userId);
    const subscription = await Subscription.findById(subscriptionId);

    if (!user || !subscription) {
      return res.status(404).json({ message: 'User or Subscription not found' });
    }

    // Create a charge using Stripe
    const charge = await stripe.charges.create({
      amount: subscription.price * 100, // Stripe expects the amount in cents
      currency: "eur",
      description: `Charge for ${user.email} for subscription ${subscription.name}`,
      source: token,
    });

    // TODO: Update the user's subscription status in the database
    // This depends on how you're managing subscriptions in your database

    res.status(200).json({ message: 'Payment processed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};