const orderRoute = require('express').Router();
const orderController = require('../controllers/orderController');


orderRoute.route('/saveOrder').post(orderController.saveOrder);
orderRoute.route('/saveTransacation').post(orderController.saveTransaction);



module.exports = orderRoute;