const Order = require('../models/order');

module.exports.saveOrder = async (req, res) => {
    try {
        if (!req.body.user || !req.body.variant_id || !req.body.quantity || !req.body.price || !req.body.total) {
            res.status(200).json({ message: 'all fields required' });
        }
        const newOrder = new Order({
            user: req.body.user,
            products: [{ variant_id: req.body.variant_id, quantity: req.body.quantity, price: req.body.price }],
            total: req.body.total,
        });
        newOrder.save();
        res.status(200).json({ message: 'order saved', data: newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}