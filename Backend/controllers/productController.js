const Product = require('../models/productModel');

module.exports.addProduct = async (req, res) => {
    const { name, category_id, subCategory_id, description } = req.body;

    try {
        // Validate the request data
        if (!name || !category_id || !subCategory_id || !description) {
            return res.status(400).json({ message: 'all fields are required' });
        }
        // Create a new Product object using the request body
        const product = new Product({
            name: req.body.name,
            category_id: req.body.category_id,
            subCategory_id: req.body.subCategory_id,
            description: req.body.description,
            product_image: req.file.originalname
        });

        // Save the new product to the database
        await product.save();
        return res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
};



module.exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products.length > 0) {
            return res.status(201).json({ message: 'Product not found', data: products });
        }
        return res.status(201).json({ message: 'Products data', data: products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
};



module.exports.getProductsByCatId = async (req, res) => {
    try {
        const { category_id } = req.body;
        if (!category_id) {
            return res.status(200).json({ success: false, message: 'category_id not found' });
        }
        const products = await Product.find({ category_id });
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'server error' });
    }
};



module.exports.getProductsByProductId = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(200).json({ success: false, message: '_id not found' });
        }
        const products = await Product.findOne({ _id });
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'server error' });
    }
};



module.exports.updateProduct = async (req, res) => {
    try {
        const { name, category_id, subCategory_id, description } = req.body;

        if (!name || !category_id || !subCategory_id || !description) {
            return res.status(200).json({ success: true, message:'all fields required' });
        }

        const products = await Product.updateOne({ _id: req.body._id },
            { $set: { name, category_id, subCategory_id, description, product_image: req.file.product_image } }
        );
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'server error' });
    }
};


module.exports.deleteProduct = async (req, res) => {
    try {
        let data = await Product.deleteOne({ _id: req.query.id });
        if (data.deletedCount > 0) {
            return res.status(201).json({ message: 'Product deleted' });
        } else {
            return res.status(201).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'server error' });
    }
};