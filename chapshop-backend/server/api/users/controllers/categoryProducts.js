const asyncHandler = require('express-async-handler')
const Services = require('../../../service/network')
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))
const Categories = require('../../categories/category.model')
const Products = require('../../products/product.model')

//////////////////////VALIDATIONS////////////////////////////////
const categorySchema = Joi.object().keys({
  category_id: Joi.string().trim().required().messages({
    'string.empty': 'Category id is required',
  }),
})
//////////////////////////////////////////

const categoryProducts = asyncHandler(async (req, res) => {
  try {
    const category_id = req.params.category_id
    let sortValue = ''
    let pages = 0
    let total_products = 0
    let item_per_page = 16
    let current_page_no = req.query.page || 1
    let category_products = ''
    if (req.query.filter) {
      sortValue = req.query.filter === "des" ? '-reselling_price' : 'reselling_price'
    }
    else {
      sortValue = '-createdAt'

    }

    let result = categorySchema.validate({ category_id: category_id })
    if (result.error) {
      return Services._validationError(
        res,
        'Validation Error',
        result.error.details[0].message
      )
    }
    const category = await Categories.find({ _id: category_id })
    if (category.length > 0) {
      if (req.query.product_name) {
        total_products = await Products.find({
          category_id: category_id, is_draft: false, product_name: { $regex: req.query.product_name, $options: "i" },
        }).count()
        category_products = await Products.find({
          category_id: category_id,
          product_name: { $regex: req.query.product_name, $options: "i" },
          is_draft: false,
        }).skip((current_page_no * item_per_page) - item_per_page).sort(sortValue).limit(item_per_page)
      } else {
        total_products = await Products.find({ category_id: category_id, is_draft: false }).count()

        category_products = await Products.find({
          category_id: category_id,
          is_draft: false,
        }).skip((current_page_no * item_per_page) - item_per_page).sort(sortValue).limit(item_per_page)

      }
      if (category_products.length <= 0) {
       
        return Services._noContent(res, 'No product found under this category')
      } else {
        pages = Math.ceil(total_products / 16)

        return Services._response(res, category_products, "Success", pages)
      }
    } else {
      return Services._noContent(res, '', 'Category Not found')
    }
  } catch (e) {
    return Services._handleError(res, e)
  }
})

module.exports = { categoryProducts }
