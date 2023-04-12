const variantAttributeRoutes = require('express').Router();
const variantAttributeController = require('../controllers/variantAttributeController');

variantAttributeRoutes.post('/add-Attribute', variantAttributeController.addVariantAttribute);



module.exports = variantAttributeRoutes;