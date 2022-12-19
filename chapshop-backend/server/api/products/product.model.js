const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const productSchema = mongoose.Schema(
  {
    product_name: { type: String, unique: true },
    buying_price: { type: Number },
    reselling_price: { type: Number },
    product_name: { type: String },
    main_image: {
      type: Array,
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
    sharing_images: {
      type: Array,
    },
    is_draft: {
      type: Boolean,
      default: false,
    },
    sku: {
      type: String,
      unique: true,
      require: true
    },
    sizes: { type: [String] }
  },
  {
    timestamps: true,
  }
)
productSchema.virtual('category', {
  ref: "Category",
  localField: 'category_id',
  foreignField: '_id',
  justOne: true
})
productSchema.set('toJSON', { virtuals: true })
productSchema.plugin(mongoosePaginate)
const Product = mongoose.model('Product', productSchema)
const options = {
  page: 1,
  limit: 50,
  collation: {
    locale: 'en',
  },
}
Product.paginate(options).then()
exports = module.exports = Product
