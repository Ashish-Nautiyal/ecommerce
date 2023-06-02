const Promocode = require('../models/promoCode');
const AssignPromocode = require('../models/assignPromocodes');

module.exports.savePromoCode = async (req, res) => {
    try {
        const { title, promoCode, discount, expiry_date } = req.body;
        if (!title || !promoCode || !discount || !expiry_date) {
            return res.status(200).json({ message: 'All fields required.' });
        }

        const newPromocode = new Promocode({
            title,
            promoCode,
            discount,
            expiry_date
        });
        newPromocode.save();
        return res.status(200).json({ message: 'Promocode saved.', success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Intenal server error.', success: false });
    }
}

module.exports.getPromocodes = async (req, res) => {
    try {
        const promoCodes = await Promocode.find({});
        return res.status(200).json({ message: 'promocodes.', data: promoCodes, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.assignPromocodes = async (req, res) => {
    try {
        const { user, promocode } = req.body;
        if (!user || !promocode) {
            return res.status(404).json({ message: 'All fields required.' })
        }

        const userExist = await AssignPromocode.findOne({ user });
        if (userExist) {
            if (userExist.promocode.includes(promocode)) {
                return res.status(200).json({ message: 'Already assigned.' });
            } else {
                await AssignPromocode.updateOne({ _id: userExist._id }, { $push: { promocode } });
            }
        } else {
            const newAssignPromo = new AssignPromocode({
                user,
                promocode
            });
            await newAssignPromo.save();
        }
        return res.status(200).json({ message: 'Promocode assign successfully.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports.applyPromocode = async (req, res) => {
    try {
        const { user, promocode } = req.body;
        if (!user || !promocode) {
            return res.status(200).json({ message: 'All fields required.' });
        }
        const userExist = await AssignPromocode.findOne({ user });
        if (userExist) {
            const promocodeExist = await Promocode.findOne({ promoCode: promocode });
            if (promocodeExist) {
                if (userExist.promocode.includes(promocodeExist._id)) {
                    return res.status(200).json({ message: 'Promocode found.', data: promocodeExist.discount });
                } else {
                    return res.status(200).json({ message: 'you dont have promocode.' });
                }
            } else {
                return res.status(200).json({ message: 'Promocode not found.' });
            }
        } else {
            return res.status(200).json({ message: 'You dont have promocode.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports.deletePromocode = async (req, res) => {
    try {
        const { _id } = req.query;
        if (!_id) {
            return res.status(200).json({ message: 'promocode required.' });
        }
        await Promocode.deleteOne({ _id });
        return res.status(200).json({ message: 'promocode deleted successfully.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}