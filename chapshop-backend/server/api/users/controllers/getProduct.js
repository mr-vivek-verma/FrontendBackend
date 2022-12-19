const asyncHandler = require('express-async-handler')
const Services = require('../../../service/network')
const Joi = require('@hapi/joi')
const Products = require('../../products/product.model')

const getProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Products.find({
      _id: req.params.product_id,
      is_draft: false,
    }).populate({ path: 'category', select: '_id category_name sizes' })
    
    if (product.length > 0) {
      return Services._response(res, product[0])
    } else {
      return Services._noContent(res, '', 'Product Not found')
    }
  } catch (e) {
    return Services._handleError(res, e)
  }
})

module.exports = { getProduct }
