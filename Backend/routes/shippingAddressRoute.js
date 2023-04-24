const shippingAddressRoutes = require('express').Router();
const shippingAddressController = require("../controllers/shippingAddressController");

shippingAddressRoutes.route('/addShippingAddress').post(shippingAddressController.addShippingAddress);
shippingAddressRoutes.route('/getShippingAddress').post(shippingAddressController.getShippingAddress);



module.exports = shippingAddressRoutes;