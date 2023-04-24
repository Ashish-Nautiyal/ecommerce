const ShippingAddress = require('../models/shippingAddress');

module.exports.addShippingAddress = async (req, res) => {
    try {
        const { user, country, state, city, street, pincode, phone_number } = req.body;
        if (!user || !country || !state || !city || !street || !pincode || !phone_number) {
            return res.status(200).json({ message: 'all fields required' });
        }

        const newAddress = new ShippingAddress({
            user,
            country,
            state,
            city, 
            street,
            pincode,
            phone_number
        });
        newAddress.save();
        res.status(200).json({ message: 'address saved', data: newAddress });
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: 'server error' });
    }
}


module.exports.getShippingAddress = async (req, res) => {
    try {
        if (!req.body.user) {
            return res.status(200).json({ message: 'user required' });
        }
        const Address = await ShippingAddress.find({ user: req.body.user });
        res.status(200).json({ message: 'address detail', data: Address });
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: 'server error' });
    }
}