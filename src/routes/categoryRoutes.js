const express = require("express");
const {
  getCategory,
  createCategory,
  updateCategory,
  getCategoryById,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

//to get the category
router.get("", getCategory);

//to add the category
router.post("/add", createCategory);

//to get category by id
router.get("/:id", getCategoryById);

//to update the category
router.put("/:id", updateCategory);

//to delete the category
router.delete("/:id",deleteCategory)

module.exports = router;
