const asyncHandler = require('express-async-handler')
const Users = require('./../user.model')
const Services = require("./../../../service/network");
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//////////////////////VALIDATIONS////////////////////////////////
const loginSchema = Joi.object().keys({
    email: Joi.string()
        .trim()
        .required()
        .lowercase()
        .max(50)
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ["edu", "com"],
            },
        })
        .messages({
            "string.empty": "Email is required",
            "string.max": "Email should be less than 50 letter",
            "string.email": "Email is invalid",
            "any.required": "Email is required",
        }),
    password: Joi.string().trim().min(8).required().messages({
        "string.base": "Password should be string",
        "string.empty": "Password required",
         "string.min": "Password should be minimum 8 letter",
        "any.required": "Password is required",
    }),
    device_id: Joi.string().optional(),
    fcm_id: Joi.string().optional()
})
///////////////////////////////////////////////////////////


const login = asyncHandler(async (req, res) => {
    try {
        // let result = await loginSchema.validate(req.body);
        // if (result.error) {
        //     return Services._validationError(
        //         res,
        //         "Validation Error",
        //         result.error.details[0].message
        //     );
        // }
        const user = await Users.findOne(
            { email: req.body.email },
            { __v: 0, createdAt: 0, updatedAt: 0, otp: 0, suspendedTill: 0}
        );
     
     
        // if(user.userType=='Admin'){
          
        //     var user_id=user.id;
        //     const update_user = await Users.updateOne(
        //         { _id: user_id},
        //         {
        //             $set: {
        //                 device_id:req.body.device_id,
        //                 fcm_id:req.body.fcm_id
        //             },
        //         }
        //     )
        // }
      
      
        if (!user) {
            return Services._unauthorized(
                res,
                "Validation Error",
                "Invalid username and password"
            );
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return Services._unauthorized(
                res,
                "Validation Error",
                "Invalid Credentials"
            );
        }
        const token = await jwt.sign(
            { user: user.email, userType: user.userType },
            process.env.JWT_SECRET_KEY
        );
        const baseUrl =  `${process.env.USER_URL}`;
        user.token = token;

        await user.save();
        return Services._response(res, { user});
    } catch (e) {
        return Services._handleError(res, e)
    }
})


module.exports = { login }