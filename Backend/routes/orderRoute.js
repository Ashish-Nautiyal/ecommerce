const orderRoute = require('express').Router();
const orderController = require('../controllers/orderController');

orderRoute.route('/saveOrder').post(require('express').json(), orderController.saveOrder);

module.exports = orderRoute;