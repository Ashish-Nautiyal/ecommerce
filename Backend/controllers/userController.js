const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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

            const token = jwt.sign({ email: user.email,role:user.role }, process.env.JWT_SECRET_KEY);

            return res.status(200).json({ message: 'user login successfully', token, user });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'server error' });
    }
};