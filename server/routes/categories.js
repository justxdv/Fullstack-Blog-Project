const router = require('express').Router();

const Category = require('../models/Category');

// CREATE CATEGORY
router.post('/', async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const postCat = await newCat.save();
        res.status(200).json(postCat);
    } catch (err) {
        res.status(500).json({message: 'Failed to create category', error: err});
    }
});

// READ CATEGORY
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({message: 'Failed to get categories', error: err});
    }
});

module.exports = router;