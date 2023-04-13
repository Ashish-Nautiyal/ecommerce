const variantController = require('../controllers/productVariantController');
const variantRoute = require('express').Router();

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

variantRoute.post('/addVariant',upload.fields([{ name: 'variant_image'}, { name: 'colour_image' }]), variantController.addVariant);
variantRoute.get('/getVariants',variantController.getVariants);
variantRoute.post('/getVariantById',variantController.getVariantById);
variantRoute.post('/getVariantByProductId',variantController.getVariantByProductId);
variantRoute.post('/getVariantColours',variantController.getVariantColours);
variantRoute.post('/getVariantSize',variantController.getVariantSize);
variantRoute.post('/searchVariant',variantController.searchVariant);



module.exports = variantRoute; 