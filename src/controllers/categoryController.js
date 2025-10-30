const { default: mongoose } = require("mongoose");
const Category = require("../models/categorySchema");

// To get the category list
const getCategory = async (req, res, next) => {
  try {
    const category = await Category.find({});
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
//end

//To get the category by Id
const getCategoryById = async (req, res, next) => {
  try {
    const category_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(category_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID format",
      });
    }
    const category = await Category.findById({ _id: category_id });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
// end

// to create the category
const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = new Category({
      name,
      description,
    });
    await category.save();
    res.status(200).json({
      success: true,
      category: category,
    });
  } catch (error) {
    next(error);
  }
};
// end

// Update the category
const updateCategory = async (req, res, next) => {
  try {
    const category_id = req.params.id;
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      category_id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};
// end

//delete the category
const deleteCategory = async (req, res, next) => {
  try {
    const category_id = req.params.id;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(category_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID format",
      });
    }

    const result = await Category.deleteOne({ _id: category_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//end

module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  getCategoryById,
  deleteCategory,
};
