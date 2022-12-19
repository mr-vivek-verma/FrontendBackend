const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi");
const Categories = require("../category.model");

//////////////////////VALIDATIONS////////////////////////////////
const categorySchema = Joi.object().keys({
    category_id: Joi.string().trim().required().messages({
        "string.empty": "Category id is required",
      })
});
//////////////////////////////////////////
const getCategory = asyncHandler(async (req, res) => {
  try {
     const category_id = req.params.category_id;
     if(!req.params.category_id){
        return Services._response(res, "category _id is required");
  
     }
     let result =  categorySchema.validate({category_id:category_id});
    if (result.error) {
      return Services._validationError(
        res,
        "Validation Error",
        result.error.details[0].message
      );
    }
   const category = await Categories.find({ _id: req.params.category_id })
   if(category.length>0){
    return Services._response(res, category[0]);
  }else {
     return Services._noContent(res, "", "Category Not found");
   }
} catch (e) {
    return Services._handleError(res, e);
  }
});

module.exports = { getCategory };
