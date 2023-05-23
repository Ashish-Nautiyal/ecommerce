const orderRoute = require('express').Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleWare/authMiddleWare');

orderRoute.route('/saveOrder').post(auth, require('express').json(), orderController.saveOrder);
orderRoute.route('/getOrder').post(auth, require('express').json(), orderController.getOrderById);

module.exports = orderRoute;