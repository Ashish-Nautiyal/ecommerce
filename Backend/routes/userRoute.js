const userControlller = require('../controllers/userController');
const userRoute = require('express').Router();

userRoute.post('/sign-up',userControlller.signUp);
userRoute.post('/login',userControlller.login);

module.exports = userRoute; 