const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const Categories = require("../category.model");
const { Upload } = require("../../../service/uploads");
const categorySchema = Joi.object().keys({
  category_name: Joi.string().required().messages({
    "string.empty": "Category name is required",
  }),
  sizes: Joi.array().required().messages({
    "array.empty": "Size is required",
  }),
});
const addCategory = asyncHandler(async (req, res) => {
  try {
    let result = await categorySchema.validate(req.body);
    if (result.error) {
      return Services._validationError(
        res,
        "Validation Error",
        result.error.details[0].message
      );
    }
    const duplicate_value = await Categories.find({
      category_name: req.body.category_name,
    });
    if (duplicate_value.length > 0) {
      return Services._noData(res, "Category name already exists");
    }

    let key = await Upload(req.file, req.file.fieldname);
    let {buffer,...rest}=req.file
   let file=rest;
    file["filename"] = key;

    let add_category = await Categories.create({
      ...req.body,
      category_image: file,
      created_at: new Date(),
      updated_at: "",
    });
    return Services._response(res, add_category);
  } catch (e) {
    return Services._handleError(res, e);
  }
});

module.exports = { addCategory };
