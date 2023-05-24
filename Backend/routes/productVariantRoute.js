const express = require('express');
const variantController = require('../controllers/productVariantController');
const variantRoute = express.Router();
const auth = require('../middleWare/authMiddleWare');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/product_variant_images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

variantRoute.post('/addVariant', auth, upload.fields([{ name: 'variant_image' }, { name: 'colour_image' }]), express.json(), variantController.addVariant);
variantRoute.get('/getVariants', auth, express.json(), variantController.getVariants);
variantRoute.post('/getVariantById', auth, express.json(), variantController.getVariantById);
variantRoute.post('/getVariantByProductId', express.json(), variantController.getVariantByProductId);
variantRoute.post('/getVariantColours', auth, express.json(), variantController.getVariantColours);
variantRoute.post('/getVariantSize', auth, express.json(), variantController.getVariantSize);
variantRoute.post('/searchVariant', auth, express.json(), variantController.searchVariant);
variantRoute.post('/updateVariant', auth, upload.fields([{ name: 'variant_image' }, { name: 'colour_image' }]), express.json(), variantController.updateVariant);


module.exports = variantRoute; 