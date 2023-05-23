const User = require('../models/userModel');

module.exports.getProfile = async (req, res) => {
    try {
        if (!req.body._id) {
            return res.status(200).json({ message: 'userId required' });
        }
        const user = await User.findOne({ _id: req.body._id });
        if (user) {
            return res.status(200).json({ message: 'user profile', data: user });
        } else {
            return res.status(200).json({ message: 'user not found', data: user });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
}

module.exports.updateProfile = async (req, res) => {
    try {
        const { _id, name, address, email, password, phone_number } = req.body;
        if (!_id || !name || !address || !email || !password || !phone_number) {
            return res.status(200).json({ message: 'all fields are required' });
        }
        await User.updateOne({ _id: req.body._id }, { $set: req.body });
        return res.status(200).json({ message: 'data updated' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
}