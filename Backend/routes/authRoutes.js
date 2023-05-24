const express = require('express');
const authController = require('../controllers/authController');
const authRoute = express.Router();
const auth = require('../middleWare/authMiddleWare');

authRoute.post('/sign-up', express.json(), authController.signUp);
authRoute.post('/quickSignup', express.json(), authController.quickSignUp);
authRoute.post('/login', express.json(), authController.login);
authRoute.post('/sms', auth, express.json(), authController.sms);
authRoute.post('/ipToUser', auth, express.json(), authController.updateIpToUser);
authRoute.post('/payment', express.json(), authController.payment);
authRoute.post('/webhook', express.raw({ type: 'application/json' }), authController.Webhook);

module.exports = authRoute;