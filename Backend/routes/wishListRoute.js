const wishListRoute = require('express').Router();
const wishListController = require('../controllers/wishListController');

wishListRoute.post('/addWishlist', require('express').json(), wishListController.addWishlist);
wishListRoute.post('/getWishlist', require('express').json(), wishListController.getWishlist);
wishListRoute.post('/removeWishlist', require('express').json(), wishListController.removeWishlist);

module.exports = wishListRoute;