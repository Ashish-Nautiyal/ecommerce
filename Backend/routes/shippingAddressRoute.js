const shippingAddressRoutes = require('express').Router();
const shippingAddressController = require("../controllers/shippingAddressController");

shippingAddressRoutes.post('/addShippingAddress',require('express').json(),shippingAddressController.addShippingAddress);
shippingAddressRoutes.route('/getShippingAddress').post(shippingAddressController.getShippingAddress);



module.exports = shippingAddressRoutes;