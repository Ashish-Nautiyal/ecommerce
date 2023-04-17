const cartRoutes = require('express').Router();
const cartController = require('../controllers/cartController');

cartRoutes.post('/addToCart', cartController.addTocart);
cartRoutes.post('/getCart', cartController.getCart);
cartRoutes.post('/increaseCart', cartController.increaseCart);
cartRoutes.post('/decreaseCart', cartController.decreaseCart);
cartRoutes.post('/removeCart', cartController.removeCart);





module.exports = cartRoutes;