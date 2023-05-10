const categoryController = require('../controllers/categoryController');
const categoryRoute = require('express').Router();

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


categoryRoute.post('/addCategory',upload.single('category_image'),categoryController.addCategory);
categoryRoute.get('/getCategory',categoryController.getCategories);
categoryRoute.get('/getCategoryTree',categoryController.getCategoryTree);
categoryRoute.get('/getSubCategories',categoryController.getSubCategory);
categoryRoute.post('/getCategoriesById',require('express').json(),categoryController.getCategoryById);
categoryRoute.post('/categoryById',require('express').json(),categoryController.categoryById);

 


module.exports = categoryRoute;  