const authController = require('../controllers/authController');
const authRoute = require('express').Router();
const auth = require('../middleWare/authMiddleWare');

authRoute.post('/sign-up', require('express').json(), authController.signUp);
authRoute.post('/quickSignup', require('express').json(), authController.quickSignUp);
authRoute.post('/login', require('express').json(), authController.login);
authRoute.post('/sms', auth, require('express').json(), authController.sms);
authRoute.post('/ipToUser', auth, require('express').json(), authController.updateIpToUser);
authRoute.post('/payment', require('express').json(), authController.payment);
authRoute.post('/webhook', require('express').raw({ type: 'application/json' }), authController.Webhook);

module.exports = authRoute;