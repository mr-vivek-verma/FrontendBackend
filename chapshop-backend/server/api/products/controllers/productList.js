const asyncHandler = require('express-async-handler')
const Services = require('../../../service/network')
const Joi = require('@hapi/joi')
const Products = require('../product.model')

// product list wiht pagination and sorting
// const productList = asyncHandler(async (req, res) => {
//   try {
//     let product_list
//     let page = req.query.page || 1
//     let limit = req.query.limit || 50
//     let sortOrder = req.query.sort || 1
//     console.log('sort order', sortOrder)
//     if (req.query.product_name != undefined) {
//       product_list = await Products.paginate(
//         {
//           product_name: { $regex: `.*${req.query.product_name}.*` },
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
//         {},
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
const productList = asyncHandler(async (req, res) => {
  try {
    let product_list

    if (req.query.product_name != undefined) {
      product_list = await Products.find({
        product_name: { $regex: `.*${req.query.product_name}.*` },
      }).populate({ path: 'category',  select: '_id category_name sizes', }).sort('-createdAt')
    } else {
      product_list = await Products.find().populate({
        path: 'category',
        select: '_id category_name sizes',
      }).sort('-createdAt')
    }
    if (product_list.length > 0) {
      return Services._response(res, product_list)
    } else {
      return Services._noContent(res, '', 'No Product Found')
    }
  } catch (e) {
    return Services._handleError(res, e)
  }
})

module.exports = { productList }
