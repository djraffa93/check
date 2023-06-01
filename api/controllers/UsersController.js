const User = require('../models/User');
const Subscription = require('../models/Subscription');
const jwt = require('jsonwebtoken');

const getUserIdFromToken = (token) => {
    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.id;
    } catch (error) {
        return null;
    }
};

exports.getUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assumes 'Bearer <token>' format
        const userId = getUserIdFromToken(token);

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assumes 'Bearer <token>' format
        const userId = getUserIdFromToken(token);
        const updatedData = req.body;

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: user, message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserSubscription = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assumes 'Bearer <token>' format
        const userId = getUserIdFromToken(token);

        const user = await User.findById(userId).populate('subscription');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ subscription: user.subscription });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};