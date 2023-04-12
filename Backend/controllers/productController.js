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
        });

        // Save the new product to the database
        await product.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
};



module.exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products.length > 0) {
            return res.status(201).json({ message: 'Product not found', data: products });
        }
        res.status(201).json({ message: 'Products data', data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
};



module.exports.deleteProduct = async (req, res) => {
    try {
        let data = await Product.deleteOne({ _id: req.query.id });
        if (data.deletedCount > 0) {
            res.status(201).json({ message: 'Product deleted' });
        } else {
            res.status(201).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'server error' });
    }
};