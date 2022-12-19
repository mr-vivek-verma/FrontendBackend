const Services = require('../service/network')
const jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
    const token = req.header("x-auth-token")
    if (!token) {
        return Services._validationError(res,'', "No token,authorization failed");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded.userType === "Admin") {
            next()
        } else {
            return Services._validationError(res,'', "Only Admin is authorized. ")

        }

    } catch (error) {
        console.log(error)
        Services._handleError(res, "Session expired , please login again", "Token is not valid");

    }
}