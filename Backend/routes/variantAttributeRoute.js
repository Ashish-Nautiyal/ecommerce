const variantAttributeRoutes = require('express').Router();
const variantAttributeController = require('../controllers/variantAttributeController');

variantAttributeRoutes.post('/addAttribute', variantAttributeController.addVariantAttribute);

module.exports = variantAttributeRoutes;