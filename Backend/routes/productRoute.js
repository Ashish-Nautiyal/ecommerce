const productController = require('../controllers/productController');
const productRoute = require('express').Router();
const auth = require('../middleWare/authMiddleWare');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/product_images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

productRoute.post('/addProduct', auth, upload.single('product_image'), require('express').json(), productController.addProduct);
productRoute.get('/getProducts', auth, productController.getProducts);
productRoute.delete('/deleteProduct', auth, require('express').json(), productController.deleteProduct);
productRoute.post('/getProductByCatId', auth, require('express').json(), productController.getProductsByCatId);
productRoute.post('/getProductByProductId', auth, require('express').json(), productController.getProductsByProductId);
productRoute.post('/updateProduct', auth, upload.single('product_image'), require('express').json(), productController.updateProduct);

module.exports = productRoute;