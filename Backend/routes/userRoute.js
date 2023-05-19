const userControlller = require('../controllers/userController');
const userRoute = require('express').Router();
const auth = require('../middleWare/authMiddleWare');

userRoute.post('/sign-up', require('express').json(), userControlller.signUp);
userRoute.post('/quickSignup', require('express').json(), userControlller.quickSignUp);
userRoute.post('/login', require('express').json(), userControlller.login);
userRoute.post('/sms', auth, require('express').json(), userControlller.sms);
userRoute.post('/updateProfile', auth, require('express').json(), userControlller.updateProfile);
userRoute.post('/ipToUser', auth, require('express').json(), userControlller.updateIpToUser);
userRoute.post('/payment', require('express').json(), userControlller.payment);
userRoute.post('/webhook', require('express').raw({ type: 'application/json' }), userControlller.Webhook);
userRoute.post('/getProfile', auth, require('express').json(), userControlller.getProfile);

module.exports = userRoute;     