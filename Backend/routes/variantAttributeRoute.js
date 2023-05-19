const variantAttributeRoutes = require('express').Router();
const variantAttributeController = require('../controllers/variantAttributeController');
const auth = require('../middleWare/authMiddleWare');

variantAttributeRoutes.post('/addAttribute', auth, require('express').json(), variantAttributeController.addVariantAttribute);
variantAttributeRoutes.post('/getAttributeByVariantId', auth, require('express').json(), variantAttributeController.getAttributeByVariantId);
variantAttributeRoutes.post('/getAttributeById', auth, require('express').json(), variantAttributeController.getAttributeById);
variantAttributeRoutes.post('/updateAttribute', auth, require('express').json(), variantAttributeController.updateAttribute);

module.exports = variantAttributeRoutes;