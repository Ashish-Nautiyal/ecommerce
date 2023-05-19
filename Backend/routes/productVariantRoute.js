const variantController = require('../controllers/productVariantController');
const variantRoute = require('express').Router();
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

variantRoute.post('/addVariant', auth, upload.fields([{ name: 'variant_image' }, { name: 'colour_image' }]), require('express').json(), variantController.addVariant);
variantRoute.get('/getVariants', auth, require('express').json(), variantController.getVariants);
variantRoute.post('/getVariantById', auth, require('express').json(), variantController.getVariantById);
variantRoute.post('/getVariantByProductId', auth, require('express').json(), variantController.getVariantByProductId);
variantRoute.post('/getVariantColours', auth, require('express').json(), variantController.getVariantColours);
variantRoute.post('/getVariantSize', auth, require('express').json(), variantController.getVariantSize);
variantRoute.post('/searchVariant', auth, require('express').json(), variantController.searchVariant);
variantRoute.post('/updateVariant', auth, upload.fields([{ name: 'variant_image' }, { name: 'colour_image' }]), require('express').json(), variantController.updateVariant);


module.exports = variantRoute; 