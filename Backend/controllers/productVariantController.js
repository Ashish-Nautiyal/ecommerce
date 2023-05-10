const Variant = require("../models/productVariantModel");
const variantAttribute = require('../models/variantAttributeModel');


module.exports.addVariant = async (req, res) => {
    try {
        const { name, product_id, price, quantity, colour } = req.body;
        if (!name || !product_id || !price || !quantity || !colour) {
            return res.status(400).json({ message: 'all fields are required', success: false });
        }

        let productImages = [];
        req.files.variant_image.map((image) => {
            productImages.push(image.originalname)
        });
        const newVariant = new Variant({
            name,
            product_id,
            price,
            quantity,
            colour,
            colour_image: req.files.colour_image[0].originalname,
            variant_image: productImages
        });
        await newVariant.save();
        return res.status(200).json({ message: 'variant added', success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
};



module.exports.getVariants = async (req, res) => {
    try {
        const variants = await Variant.find();
        if (!variants.length > 0) {
            return res.status(201).json({ message: 'Variant not found', data: variants });
        }
        return res.status(201).json({ message: 'Variants data', data: variants });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
};


module.exports.getVariantById = async (req, res) => {
    try {
        const variants = await Variant.find({ _id: req.body.variant_id });
        if (!variants.length > 0) {
            return res.status(201).json({ message: 'Variant not found', data: variants });
        }
        return res.status(201).json({ message: 'Variants data', data: variants });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
};



module.exports.getVariantByProductId = async (req, res) => {
    try {
        const variants = await Variant.find({ product_id: req.body.product_id });
        if (!variants.length > 0) {
            return res.status(201).json({ message: 'Variant not found', data: variants });
        }
        return res.status(201).json({ message: 'Variants data', data: variants });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
};



module.exports.getVariantSize = async (req, res) => {
    try {
        const attributes = await variantAttribute.find({ variant_id: req.body.id });
        if (!attributes.length > 0) {
            return res.status(201).json({ message: 'attributes not found', data: attributes });
        }
        return res.status(201).json({ message: 'Attributes data', data: attributes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
}



module.exports.getVariantColours = async (req, res) => {
    try {
        const variantColours = await Variant.find({ product_id: req.body.id }, { colour_image: 1, product_id: 1 });
        if (!variantColours.length > 0) {
            return res.status(201).json({ message: 'Variant not found', data: variantColours });
        }
        return res.status(201).json({ message: 'Variants data', data: variantColours });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
};



module.exports.searchVariant = async (req, res) => {
    try {
        const searchQuery = req.body.searchQuery;
        if (!searchQuery) {
            return res.status(200).json({ message: 'search required' });
        }
        const searchResult = await Variant.find({
            $or: [{ name: { $regex: searchQuery, $options: 'i' } }, { colour: { $regex: searchQuery, $options: 'i' } }]
        });
        return res.status(200).json({ message: 'search result', data: searchResult });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
}