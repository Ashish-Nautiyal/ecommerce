const Order = require('../models/order');
const Transaction = require('../models/transaction');

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
                let newTotal = userExist.total + total;
                await Order.updateOne({ _id: userExist._id }, { $set: { total: newTotal }, $push: { products: { variant_id: products[i]._id, quantity: products[i].qty, price: products[i].price } } });
            } else {
                const newOrder = new Order({
                    user,
                    products: [{ variant_id: products[i]._id, quantity: products[i].qty, price: products[i].price }],
                    shippingAddress,
                    total: total,
                });
                await newOrder.save();
            }
        }
        res.status(200).json({ message: 'order saved' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


module.exports.saveTransaction = async (req, res) => {
    try {
        const { transaction_id, name, email, total_amount, createdAt, status } = req.body;
        if (!transaction_id || !name || !email || !total_amount || !createdAt || !status) {
            return res.status(200).json({ message: 'all fields required' });
        }
        const newTransaction = new Transaction({
            transaction_id,
            name,
            email,
            total_amount,
            createdAt,
            status
        });
        await newTransaction.save();
        res.status(200).json({ message: 'Transaction saved' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}