const Variant = require("../models/productVariantModel");
const variantAttribute = require('../models/variantAttributeModel');


module.exports.addVariant = async (req, res) => {
    try {
        const { name, product_id, price, quantity, colour } = req.body;
        if (!name || !product_id || !price || !quantity || !colour) {
            return res.status(400).json({ message: 'all fields are required', success: false });
        }

        let productImages = [];
        req.files.product_image.map((image) => {
            productImages.push(image.originalname)
        });
        const newVariant = new Variant({
            name,
            product_id,
            price,
            quantity,
            colour,
            colour_image: req.files.colour_image[0].originalname,
            product_image: productImages
        });
        await newVariant.save();
        res.status(200).json({ message: 'variant added', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
};


module.exports.getVariants = async (req, res) => {
    try {
        const variants = await Variant.find();
        if (!variants.length > 0) {
            return res.status(201).json({ message: 'Variant not found', data: variants });
        }
        res.status(201).json({ message: 'Variants data', data: variants });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
};



module.exports.getVariantById = async (req, res) => {
    try {
        const variants = await Variant.find({ _id: req.body.id });
        if (!variants.length > 0) {
            return res.status(201).json({ message: 'Variant not found', data: variants });
        }
        res.status(201).json({ message: 'Variants data', data: variants });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
};



module.exports.getVariantSize = async (req, res) => {
    try {
        console.log('body',req.body);
      const attributes =  await variantAttribute.find({ variant_id: req.body.id });
      if(!attributes.length > 0){
        return res.status(201).json({ message: 'attributes not found', data: attributes });
      }
      res.status(201).json({ message: 'Attributes data', data: attributes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}



module.exports.getVariantColours = async (req, res) => {
    try {
        const variantColours = await Variant.find({ product_id: req.body.id }, { colour_image: 1, product_id: 1 });
        if (!variantColours.length > 0) {
            return res.status(201).json({ message: 'Variant not found', data: variantColours });
        }
        res.status(201).json({ message: 'Variants data', data: variantColours });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
};    