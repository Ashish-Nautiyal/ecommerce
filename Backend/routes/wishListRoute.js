const express = require('express');
const wishListRoute = express.Router();
const wishListController = require('../controllers/wishListController');
const auth = require('../middleWare/authMiddleWare');

wishListRoute.post('/addWishlist', express.json(), wishListController.addWishlist);
wishListRoute.post('/getWishlist', express.json(), wishListController.getWishlist);
wishListRoute.post('/removeWishlist', express.json(), wishListController.removeWishlist);

module.exports = wishListRoute;