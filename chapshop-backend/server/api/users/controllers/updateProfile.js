const asyncHandler = require("express-async-handler");
const Services = require("../../../service/network");
const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const Users = require("./../user.model");

//////////////////////VALIDATIONS////////////////////////////////
const userSchema = Joi.object().keys({
  sportsInterests: Joi.array()
    .optional()
    .items(
      Joi.object().keys({
        id: Joi.string().required(),
        skillLevel: Joi.string().required(),
        oftenPhysicallyActive: Joi.string(),
        mostPhysicallyActive: Joi.array(),
        activePartOfDay: Joi.array(),
        name:Joi.string().required(),
        sportsimage:Joi.string().required(),
        unique_name:Joi.string().required(),

      })
    ),
  userName: Joi.string().trim().optional().lowercase().max(15).messages({
    "string.empty": "User Name is required",
    "string.max": "User Name should be less than or equal to 15 letter",
    "any.required": "User Name is required",
  }),
  firstName: Joi.string().trim().optional().messages({
    "string.empty": "First Name is required",
    "any.required": "First Name is required",
  }),
  lastName: Joi.string().trim().optional().messages({
    "string.empty": "Last Name is required",
    "any.required": "Last Name is required",
  }),
  lastNamePrivacy: Joi.string().trim().optional().messages({
    "string.empty": "Last Name Privacy is required",
    "any.required": "Last Name Privacy is required",
  }),
  dob: Joi.date().format("YYYY-MM-DD").optional().messages({
    "date.format": "Date of birth must be in YYYY-MM-DD",
  }),
  dobPrivacy: Joi.string().trim().optional().messages({
    "string.empty": "Date of birth Privacy is required",
    "any.required": "Date of birth Privacy is required",
  }),
  age: Joi.number().optional().messages({
    "number.empty": "Age is required",
    "any.required": "Age is required",
  }),
  gender: Joi.string().trim().optional().messages({
    "string.empty": "Gender cannot be empty",
  }),
  lookingFor: Joi.array()
    .optional()
    .messages({ "array.empty": "Looking for is Required" }),
  location: Joi.object()
    .optional()
    .keys({
      latitude: Joi.number().required().messages({
        "number.base": "latitude should be number",
        "number.empty": "latitude required",
        "number.min": "latitude should be minimum 1",
        "any.required": "latitude is required",
      }),
      longitude: Joi.number().required().messages({
        "number.base": "longitude should be number",
        "number.empty": "longitude required",
        "number.min": "longitude should be minimum 1",
        "any.required": "longitude is required",
      }),
    }),
  aboutMe: Joi.string().min(15).optional().messages({
    "string.max": "About me should be less than or equal to 15 letter",
 }),

 covid_vaccination_status: Joi.string().allow(null, '').optional(),
 fitness_goals: Joi.array().optional(),
 city: Joi.string().allow(null, '').optional(),
 state: Joi.string().allow(null, '').optional(),
});
//////////////////////////////////////////

const updateProfile = asyncHandler(async (req, res) => {
  try {
     let result = await userSchema.validate(req.body);
    if (result.error) {
      return Services._validationError(
        res,
        "Validation Error",
        result.error.details[0].message
      );
    }

    const update = await Users.updateOne(
      { email: req.user },
      {
        $set: {
          ...req.body,
        },
      }
    );
    if (update.nModified) {
      const user = await Users.find({ email: req.user }, { __v: 0, createdAt: 0, updatedAt: 0, otp: 0, suspendedTill: 0, isApproved: 0, isSuspended: 0, isSuspendedPermanently: 0, resetToken: 0 })
      const userUrl = `${process.env.USER_URL}`;
      if(user.length>0){
        var photoFile=user[0].userPhoto[0].filename
        var userPhotoUrl=userUrl+photoFile

        var videoFile=user[0].userVideo[0].filename
        var userVideoUrl=userUrl+videoFile
      }
   
     
      return Services._response(res, { user:user[0],userPhotoUrl:userPhotoUrl,userVideoUrl:userVideoUrl});
    } else {
      return Services._noContent(res, "", "User Not found");
    }
  } catch (e) {
    console.log(e);
    return Services._handleError(res, e);
  }
});

module.exports = { updateProfile };
