const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi");
const Users = require("../user.model");

//////////////////////VALIDATIONS////////////////////////////////
const userSchema = Joi.object().keys({  
    email: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "email is required",
        }),
});
//////////////////////////////////////////

const logout = asyncHandler(async (req, res) => {
    try {
        let result = await userSchema.validate({email:req.user});
        if (result.error) {
            return Services._validationError(
                res, 
                "Validation Error",
                result.error.details[0].message
            );
        }
        console.log("email",req.user)
        const userData = await Users.find({ email: req.user }).lean();
          if (userData && userData.length>0) {
            const logout_user = await Users.updateOne(
                {email: req.user },
                { $set: { token : "" } });
                console.log("logout_user.nModified",logout_user.nModified)
              if (logout_user.nModified) {
                return Services._response(res, "", "Your account logout successfully");
              } else {
                return Services._noContent(res, "","User Not found");
              }
        }else{
            return Services._noContent(res, '', 'User Not found');
        }
   }catch (e) {
        console.log(e);
        return Services._handleError(res, e);
    }
});




module.exports = {logout}