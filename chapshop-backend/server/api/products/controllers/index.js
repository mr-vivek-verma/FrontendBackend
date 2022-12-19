const express = require('express')
const router = express.Router()
const adminAuth = require('./../../../middlewares/adminAuth')
const upload = require('../../../service/multer')
const { addProduct } = require('./addProduct')
const { updateProduct } = require('./updateProduct')
const { deleteProduct } = require('./deleteProduct')
const { productList } = require('./productList')
const { getProduct } = require('./getProduct')
const {getProductUsingSKU}=require('./getProductUsingSKU')
router.post(
  '/addProduct',
  adminAuth,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'sharingImages', maxCount: 5 },
  ]),
  addProduct
)
router.get('/getProduct/:product_id', adminAuth, getProduct)
router.get('/getProductUsingSKU/:sku',  getProductUsingSKU)
router.delete('/deleteProduct/:product_id', adminAuth, deleteProduct)
router.put(
  '/updateProduct',
  adminAuth,
  upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'sharing_images', maxCount: 5 },
  ]),
  updateProduct
)
router.get('/productList', adminAuth, productList)

module.exports = router
