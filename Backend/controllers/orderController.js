const Order = require('../models/order');

module.exports.saveOrder = async (req, res) => {
    try {
        console.log('body', req.body);
        const { user, product, shippingAddress, total } = req.body;
        if (!user || !product || !shippingAddress || !total) {
            return res.status(200).json({ message: 'all fields required' });
        }
        let products = product;
        for (let i = 0; i < products.length; i++) {
            let userExist = await Order.findOne({ user: req.body.user });
            if (userExist) {
                await Order.updateOne({ _id: userExist._id }, { $push: { products: { variant_id: products[i]._id, quantity: products[i].qty, price: products[i].price } } });
            } else {
                const newOrder = new Order({
                    user,
                    products: [{ variant_id: products[i]._id, quantity: products[i].qty, price: products[i].price }],
                    shippingAddress,
                    total,
                });
                console.log('order', newOrder);
                await newOrder.save();
            }
        }
        res.status(200).json({ message: 'order saved' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}