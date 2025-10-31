const express = require("express");
const {
  getCategory,
  createCategory,
  updateCategory,
  getCategoryById,
  deleteCategory,
} = require("../controllers/categoryController");
const { verifyRole } = require("../helper/checkRole");
const { ROLE } = require("../constant/role.const");
const router = express.Router();

//to get the category
router.get("",verifyRole(ROLE.SUB_ADMIN,ROLE.ADMIN) ,getCategory);

//to add the category
router.post("/add",verifyRole(ROLE.ADMIN,ROLE.SUB_ADMIN), createCategory);

//to get category by id
router.get("/:id", getCategoryById);

//to update the category
router.put("/:id",verifyRole(ROLE.ADMIN), updateCategory);

//to delete the category
router.delete("/:id",verifyRole(ROLE.ADMIN),deleteCategory)

module.exports = router;
