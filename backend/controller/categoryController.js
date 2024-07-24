const categoryModel = require('../models/categoryModel');
const slugify = require('slugify');

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: 'Name is required' });
        }

        // existing category
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category Already Exists'
            });
        }

        // Create a new category
        const category = new categoryModel({ name, slug: slugify(name) });
        await category.save();
        res.status(201).send({
            success: true,
            message: 'Category Created Successfully',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Category',
            error
        });
    }
};

// update category
const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );

        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category Not Found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Category Updated Successfully!',
            category
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating Category',
            error
        });
    }
};


// get all category
const allCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: 'All Categories List!',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting all Category',
            error
        });
    }
}


// get single category
const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single Category",
        });
    }
};


// delete category
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Categroy Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error,
        });
    }
};


module.exports = { createCategoryController, updateCategoryController, allCategoryController, singleCategoryController, deleteCategoryController };
