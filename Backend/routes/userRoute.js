const express = require('express');
const userControlller = require('../controllers/userController');
const userRoute = express.Router();
const auth = require('../middleWare/authMiddleWare');

userRoute.post('/getProfile', auth, express.json(), userControlller.getProfile);
userRoute.post('/updateProfile', auth, express.json(), userControlller.updateProfile);
userRoute.route('/getAllUsers').get(express.json(), userControlller.getAllUser);

module.exports = userRoute;     