const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    category_name: { type: String },
    sizes: {
      type: [String],
    },
    category_image: { type: Object },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);
exports = module.exports = Category;
