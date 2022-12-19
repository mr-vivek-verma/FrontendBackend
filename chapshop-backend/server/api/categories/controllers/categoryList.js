const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi");
const Categories = require("../category.model");

const categoryList = asyncHandler(async (req, res) => {
  try {
    let category_list;
    if(req.query.category_name!=undefined){
       category_list = await Categories.find({"category_name": { $regex: `.*${req.query.category_name}.*`}}).sort('-createdAt')
    }else{
       category_list= await Categories.find().sort('-createdAt')
    }
   if(category_list.length>0){
    return Services._response(res, category_list);
   }else {
     return Services._noContent(res, "", "No Category Found");
   }
} catch (e) {
    return Services._handleError(res, e);
  }
});

module.exports = { categoryList };
