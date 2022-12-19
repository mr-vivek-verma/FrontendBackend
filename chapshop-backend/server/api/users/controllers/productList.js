const asyncHandler = require('express-async-handler')
const Services = require('../../../service/network')
const Joi = require('@hapi/joi')
const Products = require('../../products/product.model')
const { func, equal } = require('@hapi/joi')

// product list with pagination and sorting
// const productList = asyncHandler(async (req, res) => {
//   try {
//     let page = req.query.page || 1
//     let limit = req.query.limit || 50
//     let product_list
//     let sortOrder = req.query.sort || 1
//     if (req.query.product_name != undefined) {
//       product_list = await Products.paginate(
//         {
//           product_name: { $regex: `.*${req.query.product_name}.*` },
//           is_draft: false,
//         },
//         {
//           page,
//           limit,
//           sort: {
//             reselling_price: sortOrder,
//             buying_price: sortOrder,
//           },
//         }
//       )
//     } else {
//       product_list = await Products.paginate(
//         {
//           is_draft: false,
//         },
//         {
//           page,
//           limit,
//           sort: {
//             reselling_price: sortOrder,
//             buying_price: sortOrder,
//           },
//         }
//       )
//     }
//     if (product_list.docs.length > 0) {
//       return Services._response(res, product_list)
//     } else {
//       return Services._noContent(res, '', 'No Product Found')
//     }
//   } catch (e) {
//     console.log(e)
//     return Services._handleError(res, e)
//   }
// })


//if filter === des range High to Low
//if filter ===ace  range Low to high
const productList = asyncHandler(async (req, res) => {
  try {
    let product_list
    let total_products = 0
    let pages = 0
    let sortValue = ''
    if (req.query.filter) {
      sortValue = req.query.filter === "des" ? '-reselling_price' : 'reselling_price'
    }
    else {
      sortValue = '-createdAt'

    }
    let item_per_page = 16
    let current_page_no = req.query.page || 1
    if (req.query.product_name != undefined && req.query.category_id != undefined) {
      total_products = await Products.find({
        product_name: { $regex: req.query.product_name, $options: "i" },
        category_id: req.query.category_id,
        is_draft: false,

      }).count()
      product_list = await Products.find({
        product_name: { $regex: req.query.product_name, $options: "i" },
        category_id: req.query.category_id, is_draft: false,
      }).skip((current_page_no * item_per_page) - item_per_page).sort(sortValue).limit(item_per_page).populate({ path: 'category', select: '_id category_name sizes' })
    } else if (req.query.product_name != undefined) {
      total_products = await Products.find({
        product_name: { $regex: req.query.product_name, $options: 'i' },
        is_draft: false,

      }).count()
      product_list = await Products.find({
        is_draft: false,
        product_name: { $regex: req.query.product_name, $options: 'i' }


      }).skip((current_page_no * item_per_page) - item_per_page).sort(sortValue).limit(item_per_page).populate({ path: 'category', select: '_id category_name sizes' })
    } else if (req.query.category_id != undefined) {
      total_products = await Products.find({
        category_id: req.query.category_id,
        is_draft: false,

      }).count()
      product_list = await Products.find({
        is_draft: false,
        category_id: req.query.category_id,


      }).skip((current_page_no * item_per_page) - item_per_page).sort(sortValue).limit(item_per_page).populate({ path: 'category', select: '_id category_name sizes' })
    }
    else {
      total_products = await Products.find({
        is_draft: false,

      }).count()
      product_list = await Products.find({
        is_draft: false,


      }).skip((current_page_no * item_per_page) - item_per_page).sort(sortValue).limit(item_per_page).populate({ path: 'category', select: '_id category_name sizes' })
    }
    if (product_list.length > 0) {
      pages = Math.ceil(total_products / 16)
      return Services._response(res, product_list, "Success", pages)
    } else {
      return Services._noContent(res, '', 'No Product Found')
    }
  } catch (e) {
    return Services._handleError(res, e)
  }
})

module.exports = { productList }
