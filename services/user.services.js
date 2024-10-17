const UserDAO = require("../dao/user.dao");

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
}

module.exports = new UserService();
