const Services = require('../service/network')
const jwt = require('jsonwebtoken')
const Users = require("./../api/users/user.model");

module.exports = async function (req, res, next) {
    const token = req.header("x-auth-token")
    if (!token) {
        return Services._validationError(res, '', "No token,authorization failed");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded.userType === "User") {
            const user = await Users.find({ email: decoded.user });
            req.user = decoded.user;
            next()
       } else {
            return Services._validationError(res, '', "Only User is authorized. ")
       }
   } catch (error) {
        console.log(error)
        Services._handleError(res, "Session expired , please login again", "Token is not valid");

    }
}