const userControlller = require('../controllers/userController');
const userRoute = require('express').Router();

userRoute.post('/sign-up',userControlller.signUp);
userRoute.post('/quickSignup',userControlller.quickSignUp);
userRoute.post('/login',userControlller.login);
userRoute.post('/sms',userControlller.sms);


module.exports = userRoute; 