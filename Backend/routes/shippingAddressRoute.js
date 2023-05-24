const express = require('express');
const shippingAddressRoutes =express.Router();
const shippingAddressController = require("../controllers/shippingAddressController");
const auth = require('../middleWare/authMiddleWare');

shippingAddressRoutes.post('/addShippingAddress', auth,express.json(), shippingAddressController.addShippingAddress);
shippingAddressRoutes.route('/getShippingAddress').post(auth,express.json(), shippingAddressController.getShippingAddress);
shippingAddressRoutes.route('/getShippingAddressById').post(auth,express.json(), shippingAddressController.getShippingAddressById);
shippingAddressRoutes.route('/updateShippingAddress').post(auth,express.json(), shippingAddressController.updateShippingAddress);
shippingAddressRoutes.route('/deleteShippingAddress').delete(auth,express.json(), shippingAddressController.deleteShippingAddress);
shippingAddressRoutes.route('/setDefaultShippingAddress').post(auth,express.json(), shippingAddressController.setDefaultShippingAddress);
shippingAddressRoutes.route('/getdefaultAddress').post(auth,express.json(), shippingAddressController.getDefaultAddress);


module.exports = shippingAddressRoutes;