const express = require('express');
const wishListRoute = express.Router();
const wishListController = require('../controllers/wishListController');
const auth = require('../middleWare/authMiddleWare');

wishListRoute.post('/addWishlist', auth, express.json(), wishListController.addWishlist);
wishListRoute.post('/getWishlist', auth, express.json(), wishListController.getWishlist);
wishListRoute.post('/removeWishlist', auth, express.json(), wishListController.removeWishlist);

module.exports = wishListRoute;