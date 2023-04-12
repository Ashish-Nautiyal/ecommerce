const categoryController = require('../controllers/categoryController');
const categoryRoute = require('express').Router();

categoryRoute.post('/add-category',categoryController.addCategory);
categoryRoute.get('/getCategories',categoryController.getCategory);
categoryRoute.get('/getSubCategories',categoryController.getSubCategory);
categoryRoute.post('/getCategoriesById',categoryController.getCategoryById);
 


module.exports = categoryRoute; 