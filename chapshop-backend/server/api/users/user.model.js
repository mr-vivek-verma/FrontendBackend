const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    dob: { type: Date },
    age: { type: Number },
    contactNumber: { type: String },
    place: { type: String },
    location: { type: Object, index: "2dsphere" },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },
    userType: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    gender: {
       type: String ,
       enum : ["Male","Female","Transgender","Intersex","Non-binary","Not Right Now"],
     
      },
    token: {
      type: String,
    },
     updated_on:{
      type:Date
    }
  },
  {
    timestamps: true,
  }
);

//////HASH THE PLAIN TEXT PASSWORD BEFORE SAVING//////
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = mongoose.model("Users", userSchema);
exports = module.exports = Users;
