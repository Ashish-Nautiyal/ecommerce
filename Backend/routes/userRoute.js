const userControlller = require('../controllers/userController');
const userRoute = require('express').Router();

userRoute.post('/sign-up',userControlller.signUp);
userRoute.post('/quickSignup',userControlller.quickSignUp);
userRoute.post('/login',userControlller.login);
userRoute.post('/sms',userControlller.sms);
userRoute.post('/updateProfile',userControlller.updateProfile);
userRoute.post('/ipToUser',userControlller.updateIpToUser);
userRoute.post('/payment',userControlller.payment);



module.exports = userRoute; 