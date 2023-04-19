const shippingAddressRoutes = require('express').Router();
const shippingAddressController = require("../controllers/shippingAddressController");

shippingAddressRoutes.route('/addShippingAddress').post(shippingAddressController.addShippingAddress);


module.exports = shippingAddressRoutes;