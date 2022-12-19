const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi");
const Categories = require("../../categories/category.model");

const categoryList = asyncHandler(async (req, res) => {
  try {
    let category_list;
    let total_products = 0
    let pages = 0

    if (req.query.category_name != undefined) {
      category_list = await Categories.find({ "category_name": { $regex: `.*${req.query.category_name}.*` } })
    } else {
      category_list = await Categories.find()
    }
    if (category_list.length > 0) {
      pages = Math.ceil(category_list.length / 16) 

      return Services._response(res, category_list, "Success", pages);
    } else {
      return Services._noContent(res, "", "No Category Found");
    }
  } catch (e) {
    return Services._handleError(res, e);
  }
});

module.exports = { categoryList };
