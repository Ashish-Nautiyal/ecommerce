const categoryController = require('../controllers/categoryController');
const categoryRoute = require('express').Router();
const auth = require('../middleWare/authMiddleWare');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/category_images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

categoryRoute.post('/addCategory',auth, upload.single('category_image'),require('express').json(), categoryController.addCategory);
categoryRoute.get('/getCategory', categoryController.getCategories);
categoryRoute.get('/getCategoryTree', categoryController.getCategoryTree);
categoryRoute.get('/getSubCategories', categoryController.getSubCategory);
categoryRoute.post('/getCategoriesById', require('express').json(), categoryController.getCategoryById);
categoryRoute.post('/categoryById', require('express').json(), categoryController.categoryById);
categoryRoute.post('/updateCategory', upload.single('category_image'), require('express').json(), categoryController.updateCategory);
categoryRoute.post('/updateSubCategory', require('express').json(), categoryController.updateSubCategory);


module.exports = categoryRoute;  