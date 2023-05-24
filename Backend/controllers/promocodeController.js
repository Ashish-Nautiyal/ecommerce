const Promocode = require('../models/promoCode');

module.exports.savePromoCode = async (req, res) => {
    try {
        const { promoCode, discount, expiry_date } = req.body;
        if (!promoCode || !discount || !expiry_date) {
            return res.status(200).json({ message: 'All fields required.' });
        }

        const newPromocode = new Promocode({
            promoCode,
            discount,
            expiry_date
        });
        newPromocode.save();
        return res.status(200).json({ message: 'Promocode saved.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Intenal server error.' });
    }
}