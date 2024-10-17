const bcrypt = require("bcrypt");
const User = require("../models/user");

const SALT_ROUNDS = 10;

class UserDAO {
  async createUser(payload) {
    const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);

    const newUser = new User({
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      password: hashedPassword,
    });
    return await newUser.save();
  }

  async findUserByEmail({ email }) {
    return await User.findOne({ email });
  }
}

module.exports = new UserDAO();
