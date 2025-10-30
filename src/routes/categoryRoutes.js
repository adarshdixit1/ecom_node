const express = require("express");
const {
  getCategory,
  createCategory,
  updateCategory,
  getCategoryById,
} = require("../controllers/categoryController");
const router = express.Router();

//to get the category
router.get("", getCategory);

//to add the category
router.post("/add", createCategory);

//to get category by id
router.get("/:id", getCategoryById);

//to update the category
router.patch("/add/:id", updateCategory);

module.exports = router;
