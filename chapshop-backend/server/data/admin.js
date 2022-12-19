const bcrypt = require("bcrypt");


const AdminData = {
  firstName: process.env.ADMIN_FIRST_NAME,
  email: process.env.ADMIN_EMAIL,
  lastName: process.env.ADMIN_LAST_NAME,
  dob: process.env.ADMIN_DOB,
  age: process.env.ADMIN_AGE,
  contactNumber: process.env.ADMIN_CONTACT_NUMBER,
  gender: process.env.ADMIN_GENDER,
  userName: process.env.ADMIN_USERNAME,
  userType: process.env.ADMIN_USERTYPE,
  password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
  isApproved: process.env.ADMIN_IS_APPROVED,
  isSuspended: process.env.ADMIN_IS_SUSPENDED,
};



module.exports = AdminData;
