const express = require('express');
const router = express.Router();
const PaymentsController = require('../controllers/PaymentsController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/purchase', jwtMiddleware, PaymentsController.processPayment);
router.get('/subscriptions', jwtMiddleware, PaymentsController.getSubscriptions);

module.exports = router;