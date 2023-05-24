const express = require('express');
const categoryController = require('../controllers/categoryController');
const categoryRoute = express.Router();
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

categoryRoute.post('/addCategory', auth, upload.single('category_image'), express.json(), categoryController.addCategory);
categoryRoute.get('/getCategory', categoryController.getCategories);
categoryRoute.get('/getCategoryTree', auth, categoryController.getCategoryTree);
categoryRoute.get('/getSubCategories', auth, categoryController.getSubCategory);
categoryRoute.post('/getCategoriesById', auth, express.json(), categoryController.getCategoryById);
categoryRoute.post('/categoryById', auth, express.json(), categoryController.categoryById);
categoryRoute.post('/updateCategory', auth, upload.single('category_image'), express.json(), categoryController.updateCategory);
categoryRoute.post('/updateSubCategory', auth, express.json(), categoryController.updateSubCategory);

module.exports = categoryRoute;  