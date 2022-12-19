const AdminData = require("./../data/admin");
const Users = require("./../api/users/user.model");

const importAdmin = async () => {
  try {
    const count = await Users.countDocuments();
    if (count < 1) {
      await Users.insertMany(AdminData);

        console.log("Admin imported".green.inverse);
    }
  } catch (error) {
      console.error(`${error}`.red.inverse);
  }
};

exports = module.exports = importAdmin;
