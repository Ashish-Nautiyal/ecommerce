const userControlller = require('../controllers/userController');
const userRoute = require('express').Router();

userRoute.post('/sign-up',userControlller.signUp);
userRoute.post('/quickSignup',userControlller.quickSignUp);
userRoute.post('/login',userControlller.login);
userRoute.post('/sms',userControlller.sms);
userRoute.post('/updateProfile',userControlller.updateProfile);
userRoute.post('/ipToUser',userControlller.updateIpToUser);
userRoute.post('/payment',require('express').json(),userControlller.payment);
userRoute.post('/webhook',require('express').raw({type: 'application/json'}),userControlller.Webhook);




module.exports = userRoute; 