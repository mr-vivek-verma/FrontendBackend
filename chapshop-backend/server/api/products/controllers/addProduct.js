const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const Products = require("../product.model");
const { Upload } = require("../../../service/uploads");
const productSchema = Joi.object().keys({
  product_name: Joi.string().required().messages({
    "string.empty": "Product name is required",
    "string.Duplicate": "Product name already exists.",
  }),
  category_id: Joi.string().trim().required().messages({
    "string.empty": "Category id is required",
  }),
  buying_price: Joi.number().required().messages({
    "string.empty": "buying price is required",
  }),
  reselling_price: Joi.number().required().messages({
    "string.empty": "reselling price is required",
  }),
  sku: Joi.string().required().messages({
    "string.empty": "sku is required",
    "string.unique": "sku must be unique",
  }),
  sizes: Joi.array(), //.required().messages({
  // 'array.empty': 'sizes is required',
  //})
  is_draft: Joi.boolean(),
});

const addProduct = asyncHandler(async (req, res) => {
  try {
 

    let result = await productSchema.validate(req.body);
    if (result.error) {
      return Services._validationError(
        res,
        "Validation Error",
        result.error.details[0].message
      );
    }

    const duplicate_value = await Products.find({
      $or: [{ product_name: req.body.product_name }, { sku: req.body.sku }],
    });
    if (duplicate_value.length > 0) {
      return Services._noData(res, "Product name or SKU already exists");
    }
    let files = {};
    let keys = Object.keys(req.files);
    for (let i = 0; i < keys.length; i++) {
      let fileData = [];
      for (let j = 0; j < req.files[keys[i]].length; j++) {
        let key = await Upload(req.files[keys[i]][j],req.files[keys[i]][j].fieldname);
        let { buffer, ...rest } = req.files[keys[i]][j];
        rest["filename"] = key;
        fileData.push(rest);
      }
      files[keys[i]] = fileData;
    }

    let add_product = await Products.create({
      ...req.body,
      main_image:files.mainImage,
      sharing_images:files.sharingImages,
      created_at: new Date(),
      updated_at: "",
    });
    return Services._response(res, add_product);
  } catch (e) {
    return Services._handleError(res, e);
  }
});

module.exports = { addProduct };
