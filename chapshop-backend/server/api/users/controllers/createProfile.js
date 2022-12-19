const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const Users = require("./../user.model");
const jwt = require('jsonwebtoken')

//////////////////////VALIDATIONS////////////////////////////////
const userSchema = Joi.object().keys({
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


    firstName: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "First Name is required",
            "any.required": "First Name is required",
        }),
    lastName: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Last Name is required",
            "any.required": "Last Name is required",
        }),
    state: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "State Name is required",
            "any.required": "State Name is required",
        }),
    city: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "City is required",
            "any.required": "City is required",
        }),
    contactNumber: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Contact Number is required",
            "any.required": "Contact Number is required",
        }),
    dob: Joi.date().format("YYYY-MM-DD").required().messages({
        "date.format": "Date of birth must be in YYYY-MM-DD",
    }),

    place: Joi.string()
        .trim()
        .optional(),
    age: Joi.number()
        .required()
        .messages({
            "number.empty": "Age is required",
            "any.required": "Age is required",
        }),
    gender: Joi.string()
        .trim()
        .optional()
        .messages({
            "string.empty": "Gender cannot be empty",
        })

});
//////////////////////////////////////////

const createProfile = asyncHandler(async (req, res) => {

    try {
        // let result = await userSchema.validate(req.body);
        // if (result.error) {
        //     return Services._validationError(
        //         res,
        //         "Validation Error",
        //         result.error.details[0].message
        //     );
        // }
        //    const user = await Users.findOne(
        //         { email: req.body.email },
        //         { __v: 0, createdAt: 0, updatedAt: 0, otp: 0, password: 0, suspendedTill:0 }
        //     );

        const token = await jwt.sign(
            { user: req.body.email, userType: req.body.userType },
            process.env.JWT_SECRET_KEY
        );
        const baseUrl = `${process.env.USER_URL}`;
        req.body.token = token
        let user = await Users.create({
            ...req.body,
            created_at: new Date(),
            updated_at: ""
        });
      return Services._response(res, { user });
    } catch (e) {
        return Services._handleError(res, e);
    }
});

module.exports = { createProfile };
