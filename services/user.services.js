const UserDAO = require("../dao/user.dao");
const { comparePassword } = require("../utils/passwordUtils");
const jwt = require("jsonwebtoken");

class UserService {
  async createUser(payload) {
    const existingEmail = await UserDAO.findUserByEmail({
      email: payload.email,
    });

    if (existingEmail) {
      throw new Error("User already exists");
    }

    return await UserDAO.createUser(payload);
  }

  async findUserByUsernameAndEmail(payload) {
    const existingIdentifier = await UserDAO.findUserByUsernameAndEmail({
      identifier: payload.identifier,
    });
    if (!existingIdentifier) {
      throw new Error("Invalid email or password, please try again.");
    }

    const isMatch = await comparePassword(
      payload.password,
      existingIdentifier.password
    );

    if (!isMatch) {
      throw new Error("Invalid email or password, please try again.");
    }

    const token = jwt.sign(
      {
        userId: existingIdentifier._id,
        username: existingIdentifier.username,
        email: existingIdentifier.email,
        firstName: existingIdentifier.first_name,
        lastName: existingIdentifier.last_name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return { existingIdentifier, token };
  }
}

module.exports = new UserService();
