const wishListRoute = require('express').Router();
const wishListController = require('../controllers/wishListController');
const auth = require('../middleWare/authMiddleWare');

wishListRoute.post('/addWishlist', auth, require('express').json(), wishListController.addWishlist);
wishListRoute.post('/getWishlist', auth, require('express').json(), wishListController.getWishlist);
wishListRoute.post('/removeWishlist', auth, require('express').json(), wishListController.removeWishlist);

module.exports = wishListRoute;