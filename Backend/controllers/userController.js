const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const Cart = require('../models/cart');
const WishList = require('../models/wishList');


module.exports.signUp = async (req, res) => {
    try {
        const { name, address, email, password, phone_number } = req.body;

        // Validate the request data
        if (!name || !address || !email || !password || !phone_number) {
            return res.status(400).json({ message: 'all fields are required' });
        }

        // Check if the email address is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email address is already in use' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record in the database
        const newUser = new User({ name, address, email, password: hashedPassword, phone_number });
        await newUser.save();

        // Send a response indicating that the registration was successful
        res.status(201).json({ message: 'User registered successfully', data: newUser });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'server error' });
    }
};


module.exports.quickSignUp = async (req, res) => {
    try {
        const { phone_number } = req.body;

        // Validate the request data
        if (!phone_number) {
            return res.status(400).json({ message: 'phone number required', success: false });
        }

        // Check if the email address is already in use
        const existingUser = await User.findOne({ phone_number });
        if (existingUser) {
            return res.status(200).json({ message: 'phone is already in use', success: false });
        }

        // Create a new user record in the database
        const newUser = new User({ phone_number });
        await newUser.save();

        // Send a response indicating that the registration was successful
        res.status(201).json({ message: 'User registered successfully', success: true, data: newUser });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'server error' });
    }
};


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        //checking password is correct or not
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send('Internal server error');
            }

            if (!result) {
                return res.status(401).send('Incorrect password');
            }

            const token = jwt.sign({ user: user._id, role: user.role }, process.env.JWT_SECRET_KEY);
            var userToken = { ...user.toObject(), token };

            return res.status(200).json({ message: 'user login successfully', data: userToken });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'server error' });
    }
};


module.exports.updateProfile = async (req, res) => {
    try {
        if (!req.body.phone_number) {
            return res.status(200).json({ message: 'Phone number required' });
        }
        await User.updateOne({ phone_number: req.body.phone_number }, { $set: req.body });
        res.status(200).json({ message: 'data updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


module.exports.sms = async (req, res) => {
    try {
        if (!req.body.mobile) {
            return res.status(200).json({ message: 'mobile required' });
        }
        client.messages
            .create({
                body: 'success',
                from: process.env.MOBILE,
                to: req.body.mobile
            })
            .then((message) => {
                console.log(message);
                res.status(200).json({ message: 'message sent' });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


module.exports.updateIpToUser = async (req, res) => {
    try {
        if (!req.body.user || !req.body.ip) {
            return res.status(200).json({ message: 'user and ip required', success: false });
        }
        await Cart.updateMany({ user: req.body.ip }, { $set: { user: req.body.user } });
        await WishList.updateOne({ user: req.body.ip }, { $set: { user: req.body.user } });
        res.status(200).json({ message: 'ip updated with user id', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}