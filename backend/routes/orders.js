const express = require('express');
const router = express.Router();
const { getAllOrders, createOrder, getOrderById } = require('../controllers/order');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

router.get('/', getAllOrders);

//CREATE ORDER
router.post('/', createOrder);

//GET ORDER BY ID
router.get('/:transaction_id/payment', getOrderById);

module.exports = router;