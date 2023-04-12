const categoryController = require('../controllers/categoryController');
const categoryRoute = require('express').Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


categoryRoute.post('/add-category',upload.single('category_image'),categoryController.addCategory);
categoryRoute.get('/getCategories',categoryController.getCategory);
categoryRoute.get('/getSubCategories',categoryController.getSubCategory);
categoryRoute.post('/getCategoriesById',categoryController.getCategoryById);
 


module.exports = categoryRoute; 