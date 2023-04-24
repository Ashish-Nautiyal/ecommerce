const Wishlist = require('../models/wishList');
const Variant = require('../models/productVariantModel');

module.exports.addWishlist = async (req, res) => {
    try {
        const { user, varinat_id } = req.body;
        if (!user || !varinat_id) {
            return res.status(200).json({ message: 'all fields required' });
        }
        const wishList = await Wishlist.findOne({ user: req.body.user });
        if (wishList) {
            if (!wishList.products.includes(req.body.varinat_id)) {
                await Wishlist.updateOne({ user: req.body.user }, { $push: { products: req.body.varinat_id } });
                return res.status(200).json({ message: 'wishList updated' });
            }
            return res.status(200).json({ message: 'wishList not updated' });
        }
        const newWishlist = new Wishlist({
            user,
            products: req.body.varinat_id
        });
        await newWishlist.save();
        res.status(200).json({ message: 'product added to wishLIst', data: newWishlist });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' })
    }
}


module.exports.getWishlist = async (req, res) => {
    try {
        if (!req.body.user) {
            return res.status(200).json({ message: 'user field required' });
        }
        const wishList = await Wishlist.findOne({ user: req.body.user });
        if (!wishList) {
            return res.status(200).json({ message: 'wishlist data not found' });
        }
        const wishListData = [];
        for (let i = 0; i < wishList.products.length; i++) {
            let a = await Variant.findOne({ _id: wishList.products[i] });
            wishListData.push(a);
        }
        res.status(200).json({ message: 'wishlist data', data: wishListData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


module.exports.removeWishlist = async (req, res) => {
    try {
        if (!req.body.user || !req.body.variant_id) {
            return res.status(200).json({ message: 'all fields required' });
        }
        await Wishlist.updateOne({ user: req.body.user }, { $pull: { products: req.body.variant_id } });
        res.status(200).json({ message: 'wishlist item removed' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}