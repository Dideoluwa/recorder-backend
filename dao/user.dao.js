const User = require("../models/user");

class UserDAO {
  async createUser(payload) {
    const newUser = new User({
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      username: payload.username,
      password: payload.password,
    });
    return await newUser.save();
  }

  async findUserByEmail({ email }) {
    return await User.findOne({ email });
  }

  async findUserByUsernameAndEmail({ identifier }) {
    return await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
  }

  async findUserById({ _id }) {
    return await User.findOne({ _id }).select("-password");
  }
}

module.exports = new UserDAO();
