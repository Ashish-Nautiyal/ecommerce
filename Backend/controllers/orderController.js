const Order = require('../models/order');
const Variant = require("../models/productVariantModel");

module.exports.saveOrder = async (req, res) => {
    try {
        const { user, product, shippingAddress } = req.body;
        if (!user || !product || !shippingAddress) {
            return res.status(200).json({ message: 'all fields required' });
        }
        let products = product;
        for (let i = 0; i < products.length; i++) {
            let userExist = await Order.findOne({ user: req.body.user });
            let total = products[i].qty * products[i].price;
            if (userExist) {
                let data = await Variant.findOne({ _id: products[i]._id });
                if (data) {
                    let newQty = data.quantity - products[i].qty;
                    if (newQty >= 0) {
                        let newTotal = userExist.total + total;
                        await Order.updateOne({ _id: userExist._id }, { $set: { total: newTotal }, $push: { products: { variant_id: products[i]._id, quantity: products[i].qty, price: products[i].price } } });
                        await Variant.updateOne({ _id: data._id }, { $set: { quantity: newQty } });
                    }
                }
            } else {
                let data = await Variant.findOne({ _id: products[i]._id });
                if (data) {
                    let newQty = data.quantity - products[i].qty;
                    if (newQty >= 0) {
                        const newOrder = new Order({
                            user,
                            products: [{ variant_id: products[i]._id, quantity: products[i].qty, price: products[i].price }],
                            shippingAddress,
                            total: total,
                        });
                        await newOrder.save();
                        await Variant.updateOne({ _id: data._id }, { $set: { quantity: newQty } });
                    }
                }
            }
        }
        return res.status(200).json({ message: 'order saved' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
}