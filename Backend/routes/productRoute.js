const productController = require('../controllers/productController');
const productRoute = require('express').Router();

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

productRoute.post('/addProduct', upload.single('product_image'), require('express').json(), productController.addProduct);
productRoute.get('/getProducts', productController.getProducts);
productRoute.delete('/deleteProduct', require('express').json(), productController.deleteProduct);
productRoute.post('/getProductByCatId', require('express').json(), productController.getProductsByCatId);
productRoute.post('/getProductByProductId', require('express').json(), productController.getProductsByProductId);
productRoute.post('/updateProduct', upload.single('product_image'), require('express').json(), productController.updateProduct);

module.exports = productRoute;