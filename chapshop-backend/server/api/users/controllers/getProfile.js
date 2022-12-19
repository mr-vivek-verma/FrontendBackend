const asyncHandler = require('express-async-handler')
const Users = require('./../user.model')
const Services = require("./../../../service/network");
const Joi = require('@hapi/joi')

//////////////////////VALIDATIONS////////////////////////////////
const getProfileSchema = Joi.object().keys({
    email: Joi.string()
        .trim()
        .required()
        .lowercase()
        .max(50)
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ["com", "net", "in"],
            },
        })
        .messages({
            "string.empty": "Email is required",
            "string.max": "Email should be less than 50 letter",
            "any.required": "Email is required",
        })
})
///////////////////////////////////////////////////////////


const getProfile = asyncHandler(async (req, res) => {
    try {
        let result = await getProfileSchema.validate(req.body);
        if (result.error) {
            return Services._validationError(
                res,
                "Validation Error",
                result.error.details[0].message
            );
        }
        const user = await Users.findOne(
            { email: req.body.email },
            { __v: 0, createdAt: 0, updatedAt: 0, otp: 0, suspendedTill: 0, password:0 }
        );
        if (!user) {
            return Services._validationError(
                res,
                "Validation Error",
                "User Not Found"
            );
        }
        const baseUrl = `${process.env.USER_URL}`;
        let userPhotoUrl = user.userPhoto && `${baseUrl}${user.userPhoto[0].filename}`;
        let userVideoUrl = user.userVideo && `${baseUrl}${user.userVideo[0].filename}`;
        return Services._response(res, { user, userPhotoUrl, userVideoUrl });
    } catch (e) {
        return Services._handleError(res, e)
    }
})


module.exports = { getProfile }