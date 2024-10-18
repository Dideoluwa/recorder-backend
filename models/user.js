const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please input your first name"],
  },

  last_name: {
    type: String,
    required: [true, "Please input your last name"],
  },

  username: {
    type: String,
    required: [true, "Please input your username"],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Input your email address"],
    match: /.+\@.+\..+/,
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Enter a password"],
  },
});

const myDB = mongoose.connection.useDb("userData");

const User = myDB.model("User", userSchema);

module.exports = User;
