const express = require('express');
const promocodeController = require('../controllers/promocodeController');
const promoCodeRoutes = express.Router();

promoCodeRoutes.route('/savePromocode').post(express.json(),promocodeController.savePromoCode);

module.exports = promoCodeRoutes;