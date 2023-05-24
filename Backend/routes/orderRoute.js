const express = require('express');
const orderRoute = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleWare/authMiddleWare');

orderRoute.route('/saveOrder').post(auth, express.json(), orderController.saveOrder);
orderRoute.route('/getOrder').post(auth, express.json(), orderController.getOrderById);

module.exports = orderRoute;