const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi");
const Categories = require("../category.model");
const Product = require("../../products/product.model");

//////////////////////VALIDATIONS////////////////////////////////
const categorySchema = Joi.object().keys({
  category_id: Joi.string().trim().required().messages({
    "string.empty": "Category id is required",
  })
});
//////////////////////////////////////////

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category_id = req.params.category_id;
    let result = await categorySchema.validate({ category_id: category_id });
    if (result.error) {
      return Services._validationError(
        res,
        "Validation Error",
        result.error.details[0].message
      );
    }
    const category = await Categories.find({ _id: req.params.category_id })
    if (category.length > 0) {
      const detete_product = await Product.deleteMany({ 'category_id': { $eq  : req.params.category_id } })

      const delete_category = await Categories.deleteOne({ _id: req.params.category_id });
      if (delete_category.deletedCount) {
        return Services._response(res, "Category Deleted Successfully");
      } else {
        return Services._noContent(res, "", "Category Not Deleted");
      }
    } else {
      return Services._noContent(res, "", "Category Not found");
    }
  } catch (e) {
    console.log(e);
    return Services._handleError(res, e);
  }
});

module.exports = { deleteCategory };
