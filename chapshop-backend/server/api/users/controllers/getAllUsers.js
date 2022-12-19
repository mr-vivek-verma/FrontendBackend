const asyncHandler = require("express-async-handler");
const Users = require("./../user.model");
const Services = require("../../../service/network");

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    let page=parseInt(req.query.page) ? parseInt(req.query.page) :1
    let limit=parseInt(req.query.limit) ? parseInt(req.query.limit) : 10
    console.log(limit)
    var skip = (page-1) * limit; 

    console.log(page,limit,skip)
    const users = await Users.find(
      {
        $and: [
          { userType: "User" },
          { isPending: 0 },
          { isSuspendedPermanently: 0 },
          { isSuspended: 0 },
        ],
      },
  
      { token: 0, otp: 0, password: 0, __v: 0 },
      { $facet   : {
        metadata: [ { $count: "total" }, { $addFields: { page: page } } ],
        data: [ { $skip: skip }, { $limit: limit } ] 
      }
    }

    );
    if (users.length <= 0) {
      return Services._noContent(res, "No Users found");
    }
    return Services._response(res, users);
  } catch (e) {
    return Services._handleError(res, e);
  }
});

const searchNewUser = asyncHandler(async (req, res) => {
  try {
    const users = await Users.find(
      {
        $and: [
          { userType: "User" },
          { isPending: 0 },
          { isApproved: 0 },
          { isSuspendedPermanently: 0 },
          { isSuspended: 0 },
          { email: new RegExp(req.params.email, "i") }
        ],
      },
      { token: 0, otp: 0, password: 0, __v: 0 }
    );

    if (users.length <= 0) {
      return Services._noContent(res, "No User found");
    }
    return Services._response(res, users);
  } catch (e) {
    console.log(e);
    return Services._handleError(res, e);
  }
});

const searchUser = asyncHandler(async (req, res) => {
  try {
    const users = await Users.find(
      {
        $and: [
          { userType: "User" },
          { isPending: 0 },
          { isApproved: 1 },
          { isSuspendedPermanently: 0 },
          { isSuspended: 0 },
          { email: new RegExp(req.params.name, "i") }
        ],
      },
      { token: 0, otp: 0, password: 0, __v: 0 }
    );

    if (users.length <= 0) {
      return Services._noContent(res, "No User found");
    }
    return Services._response(res, users);
  } catch (e) {
    console.log(e);
    return Services._handleError(res, e);
  }
});

module.exports = { getAllUsers, searchNewUser, searchUser};
