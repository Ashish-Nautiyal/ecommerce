const shippingAddressRoutes = require('express').Router();
const shippingAddressController = require("../controllers/shippingAddressController");
const auth = require('../middleWare/authMiddleWare');

shippingAddressRoutes.post('/addShippingAddress', auth, require('express').json(), shippingAddressController.addShippingAddress);
shippingAddressRoutes.route('/getShippingAddress').post(auth, require('express').json(), shippingAddressController.getShippingAddress);
shippingAddressRoutes.route('/getShippingAddressById').post(auth, require('express').json(), shippingAddressController.getShippingAddressById);
shippingAddressRoutes.route('/updateShippingAddress').post(auth, require('express').json(), shippingAddressController.updateShippingAddress);
shippingAddressRoutes.route('/deleteShippingAddress').delete(auth, require('express').json(), shippingAddressController.deleteShippingAddress);
shippingAddressRoutes.route('/setDefaultShippingAddress').post(auth, require('express').json(), shippingAddressController.setDefaultShippingAddress);
shippingAddressRoutes.route('/getdefaultAddress').post(auth, require('express').json(), shippingAddressController.getDefaultAddress);


module.exports = shippingAddressRoutes;