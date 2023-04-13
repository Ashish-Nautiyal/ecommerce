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



productRoute.post('/addProduct', upload.single('product_image'), productController.addProduct);
productRoute.get('/getProducts', productController.getProducts);
productRoute.delete('/deleteProduct', productController.deleteProduct);
productRoute.post('/getProductByCatId', productController.getProductsByCatId);




module.exports = productRoute;