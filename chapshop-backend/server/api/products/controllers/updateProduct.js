const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const Products = require("../product.model");
const { Upload } = require("../../../service/uploads");
//////////////////////VALIDATIONS////////////////////////////////
const productSchema = Joi.object().keys({
  product_name: Joi.string().optional().messages({
    "string.empty": "product name is required",
    "string.unique": "Product name already exists",
  }),
  product_id: Joi.string().trim().required().messages({
    "string.empty": "product id is required",
  }),
  buying_price: Joi.number().optional().messages({
    "string.empty": "buying price is required",
  }),
  reselling_price: Joi.number().optional().messages({
    "string.empty": "reselling price is required",
  }),
  category_id: Joi.string().trim().required().messages({
    "string.empty": "category id is required",
  }),
  sku: Joi.string().trim().required().messages({
    "string.empty": "sku is required",
  }),
  main_image: Joi.array().optional().messages({
    "string.empty": "main image is required",
  }),
  sharing_images: Joi.array().optional().messages({
    "array.empty": "sharing images is required",
  }),
  sizes: Joi.array(), //.required().messages({
  // 'array.empty': 'sizes is required',
  //})
  is_draft: Joi.boolean(),
});
//////////////////////////////////////////

const updateProduct = asyncHandler(async (req, res) => {
  try {
    let result = await productSchema.validate(req.body);
    let update_product = "";
    if (result.error) {
      return Services._validationError(
        res,
        "Validation Error",
        result.error.details[0].message
      );
    }
    const duplicate_value = await Products.find(
      {
        product_name: req.body.product_name,
        _id: { $ne: req.body.product_id },
      } || { sku: req.body.sku, _id: { $ne: req.body.product_id } }
    );
    if (duplicate_value.length > 0) {
      return Services._noData(res, "Product name already exists");
    }
    let files = {};
    let keys = Object.keys(req.files);
    for (let i = 0; i < keys.length; i++) {
      let fileData = [];
      for (let j = 0; j < req.files[keys[i]].length; j++) {
        let key = await Upload(
          req.files[keys[i]][j],
          req.files[keys[i]][j].fieldname
        );
        let { buffer, ...rest } = req.files[keys[i]][j];
        rest["filename"] = key;
        fileData.push(rest);
      }
      files[keys[i]] = fileData;
    }

    const product = await Products.findOne({ _id: req.body.product_id });
    if (product && !req.body.sizes) {
      update_product = await Products.updateOne(
        { _id: req.body.product_id },
        {
          $set: {
            ...req.body,
            main_image: files.main_image || product.main_image,
            sharing_images: files.sharing_images || product.sharing_images,
            sizes: [],
          },
        }
      );
    }
    if (product && req.body.sizes) {
      update_product = await Products.updateOne(
        { _id: req.body.product_id },
        {
          $set: {
            ...req.body,
            main_image: files.main_image || product.main_image,
            sharing_images: files.sharing_images || product.sharing_images,
            //  sizes: req.body.sizes || product.sizes
          },
        }
      );
    }


    if (update_product.nModified) {
      return Services._response(res, "Product Updated Successfully");
    } else {
      return Services._noContent(res, "", "Product Not Updated");
    }
    //else {
    return Services._noContent(res, "", "Product Not found");
    //}
  } catch (e) {
    return Services._handleError(res, e);
  }
});

module.exports = { updateProduct };
