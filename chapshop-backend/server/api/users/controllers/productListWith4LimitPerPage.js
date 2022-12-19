const asyncHandler = require('express-async-handler')
const Services = require('../../../service/network')
const Joi = require('@hapi/joi')
const Products = require('../../products/product.model')
const { func, equal } = require('@hapi/joi')
const productListWith4PageLimit = asyncHandler(async (req, res) => {
  try {
    let product_list
    let total_products = 0
    let pages = 0
    let sortValue = ''
    if (req.query.filter) {
      sortValue =req.query.filter === "des" ? '-reselling_price' : 'reselling_price'
    }
    else {
      sortValue= '-createdAt'

    }  let item_per_page = 4
    let current_page_no = req.query.page || 1
    if (req.query.product_name != undefined) {
      total_products = await Products.find({
        product_name: { $regex: req.query.product_name, $options: "i" },
        is_draft: false,

      }).count()
      product_list = await Products.find({
        product_name: { $regex: req.query.product_name, $options: "i" },
        is_draft: false,
      }).skip((current_page_no * item_per_page) - item_per_page).sort(sortValue).limit(item_per_page).populate({ path: 'category', select: '_id category_name sizes' })
    } else {
      total_products = await Products.find({
        is_draft: false,

      }).count()
      product_list = await Products.find({
        is_draft: false,


      }).skip((current_page_no * item_per_page) - item_per_page).sort(sortValue).limit(item_per_page).populate({ path: 'category', select: '_id category_name sizes' })
    }
    if (product_list.length > 0) {
      pages = Math.ceil(total_products / 4)
      //console.log(pages)
      //pages = Math.ceil(total_products / 16)? : pages
      console.log(pages)
      return Services._response(res, product_list, "Success", pages)
    } else {
      return Services._noContent(res, '', 'No Product Found')
    }
  } catch (e) {
    console.log(e)
    return Services._handleError(res, e)
  }
})

module.exports = { productListWith4PageLimit }
