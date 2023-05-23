const userControlller = require('../controllers/userController');
const userRoute = require('express').Router();
const auth = require('../middleWare/authMiddleWare');

userRoute.post('/getProfile', auth, require('express').json(), userControlller.getProfile);
userRoute.post('/updateProfile', auth, require('express').json(), userControlller.updateProfile);

module.exports = userRoute;     