const orderRoute = require('express').Router();
const orderController = require('../controllers/orderController');


orderRoute.route('/saveOrder').post(orderController.saveOrder);


module.exports = orderRoute;