const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi");
const Products = require("../product.model");

//////////////////////VALIDATIONS////////////////////////////////
const productSchema = Joi.object().keys({
  product_id: Joi.string().trim().required().messages({
        "string.empty": "Product id is required",
      })
});
//////////////////////////////////////////

const deleteProduct = asyncHandler(async (req, res) => {
  try {
     const product_id = req.params.product_id;
     let result = await productSchema.validate({product_id:product_id});
    if (result.error) {
      return Services._validationError(
        res,
        "Validation Error",
        result.error.details[0].message
      );
    }
   const product = await Products.find({ _id: req.params.product_id })
   if(product.length>0){
    const delete_product= await Products.deleteOne({ _id: req.params.product_id});
    if(delete_product.deletedCount) {
       return Services._response(res, "Product Deleted Successfully");
    }else{
        return Services._noContent(res, "", "Product Not Deleted");
    }
   }else {
     return Services._noContent(res, "", "Product Not found");
   }
} catch (e) {
    return Services._handleError(res, e);
  }
});

module.exports = { deleteProduct };
