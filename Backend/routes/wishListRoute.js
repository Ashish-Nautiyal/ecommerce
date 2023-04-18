const wishListRoute = require('express').Router();
const wishListController = require('../controllers/wishListController');

wishListRoute.post('/addWishlist', wishListController.addWishlist);
wishListRoute.post('/getWishlist', wishListController.getWishlist);
wishListRoute.post('/removeWishlist', wishListController.removeWishlist);


module.exports = wishListRoute;