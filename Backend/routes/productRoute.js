const productController = require('../controllers/productController');
const productRoute = require('express').Router();


productRoute.post('/add-product', productController.addProduct);
productRoute.get('/display-product', productController.getProducts);
productRoute.delete('/delete-product', productController.deleteProduct);



module.exports = productRoute;