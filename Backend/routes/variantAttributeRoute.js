const express = require('express');
const variantAttributeRoutes = express.Router();
const variantAttributeController = require('../controllers/variantAttributeController');
const auth = require('../middleWare/authMiddleWare');

variantAttributeRoutes.post('/addAttribute', auth, express.json(), variantAttributeController.addVariantAttribute);
variantAttributeRoutes.post('/getAttributeByVariantId', auth, express.json(), variantAttributeController.getAttributeByVariantId);
variantAttributeRoutes.post('/getAttributeById', auth, express.json(), variantAttributeController.getAttributeById);
variantAttributeRoutes.post('/updateAttribute', auth, express.json(), variantAttributeController.updateAttribute);

module.exports = variantAttributeRoutes;