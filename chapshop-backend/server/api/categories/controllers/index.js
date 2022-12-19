const express = require("express");
const router = express.Router();
const adminAuth = require("./../../../middlewares/adminAuth");
const upload = require("../../../service/multer");


const { addCategory } = require("./addCategory");
const { updateCategory } = require("./updateCategory");
const { deleteCategory } = require("./deleteCategory");
const { getCategory } = require("./getCategory");
const { categoryList } = require("./categoryList");
router.post("/addCategory", adminAuth,upload.single("category_image"), addCategory);
router.get("/getCategory/:category_id", adminAuth, getCategory);
router.delete("/deleteCategory/:category_id", adminAuth, deleteCategory);
router.put("/updateCategory",adminAuth,upload.single("category_image"), updateCategory);
router.get("/categoryList", adminAuth, categoryList);


module.exports = router;
