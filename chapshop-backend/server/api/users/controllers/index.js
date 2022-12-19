const express = require('express')
const router = express.Router()
const upload = require('./../../../service/multer')
const adminAuth = require('./../../../middlewares/adminAuth')
const userAuth = require('./../../../middlewares/userAuth')

var multer = require('multer')

const { login } = require('./login')
const { getProfile } = require('./getProfile')

const { createProfile } = require('./createProfile')

const { updateProfile } = require('./updateProfile')

const { logout } = require('./../controllers/logout')

const { productList } = require('./../controllers/productList')
const { categoryProducts } = require('./../controllers/categoryProducts')
const { getProduct } = require('./../controllers/getProduct')
const { categoryList } = require('./../controllers/categoryList')
const { productListWith4PageLimit } = require('./../controllers/productListWith4LimitPerPage')

router.get('/categoryList',  categoryList)
router.get('/getProduct/:product_id',  getProduct)
router.get('/productList', productList)
//router.get('/categoryProducts/:category_id',  categoryProducts)
router.get('/productListWithLimit', productListWith4PageLimit)
router.post('/login', login)
router.post('/createprofile', createProfile)
// router.post('/updateprofile', auth, updateProfile)
// router.post('/getprofile', userAuth, lastUpdatedStatus, getProfile)
router.put('/logout',  logout)

module.exports = router
