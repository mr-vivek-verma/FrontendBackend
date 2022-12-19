const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi");
const Products = require("../product.model");

//////////////////////VALIDATIONS////////////////////////////////
// const productSchema = Joi.object().keys({
//   product_id: Joi.string().trim().required().messages({
//         "string.empty": "Product id is required",
//       })
// });
//////////////////////////////////////////
const getProduct = asyncHandler(async (req, res) => {
  try {
    //  const product_id = req.params.product_id;
    //  if(!req.params.category_id){
    //     return Services._response(res, "category _id is required");

    //  }
    // console.log(category_id)
    //  let result =  productSchema.validate({product_id:product_id});
    // if (result.error) {
    //   return Services._validationError(
    //     res,
    //     "Validation Error",
    //     result.error.details[0].message
    //   );
    // }
    const product = await Products.find({ _id: req.params.product_id }).populate({ path: 'category', select: '_id category_name sizes' })
    if (product.length > 0) {
      return Services._response(res, product[0]);
    } else {
      return Services._noContent(res, "", "Product Not found");
    }
  } catch (e) {
    return Services._handleError(res, e);
  }
});

module.exports = { getProduct };
