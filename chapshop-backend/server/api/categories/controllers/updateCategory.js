const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const Categories = require("../category.model");
const { Upload } = require("../../../service/uploads");
//////////////////////VALIDATIONS////////////////////////////////
const categorySchema = Joi.object().keys({
  category_id: Joi.string().trim().required().messages({
    "string.empty": "Category id is required",
  }),
  category_name: Joi.string().optional().messages({
    "string.empty": "Category name is required",
  }),
  sizes: Joi.array().optional().messages({
    "array.empty": "Size must be an array",
  }),
});
//////////////////////////////////////////

const updateCategory = asyncHandler(async (req, res) => {
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
      _id: { $ne: req.body.category_id },
    });
    if (duplicate_value.length > 0) {
      return Services._noData(res, "Category name already exists");
    }
    let file=null;
    if(req.file){
      let key = await Upload(req.file, req.file.fieldname);
      let {buffer,...rest}=req.file
      file=rest;
      file["filename"] = key;
    }

    const category = await Categories.find({ _id: req.body.category_id });
    if (category.length > 0) {
      const update_category = await Categories.updateOne(
        { _id: req.body.category_id },
        {
          $set: {
            ...req.body,
            category_image:file || category[0].category_image,
          },
        }
      );

      if (update_category.nModified) {
        return Services._response(res, "Category Updated Successfully");
      } else {
        return Services._noContent(res, "", "Category Not Updated");
      }
    } else {
      return Services._noContent(res, "", "Category Not found");
    }
  } catch (e) {
    return Services._handleError(res, e);
  }
});

module.exports = { updateCategory };
