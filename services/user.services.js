const UserDAO = require("../dao/user.dao");
const { createToken, decodeToken } = require("../utils/jwt");
const nodemailer = require("nodemailer");
const { comparePassword } = require("../utils/passwordUtils");

const email = process.env.EMAIL;

const password = process.env.PASSWORD;

class UserService {
  async emailTransporter(userModel, token) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    const mailOptions = {
      from: email,
      to: userModel.email,
      subject: "Please verify your email address",
      text: `Please verify your account by clicking the link: 
      http://localhost:3000/verify-email?token=${token}`,
    };

    await transporter.sendMail(mailOptions);
  }

  async createUser(payload) {
    const existingEmail = await UserDAO.findUserByEmail({
      email: payload.email,
    });

    if (existingEmail) {
      throw new Error("User already exists");
    }

    return await UserDAO.createUser(payload);
  }

  async sendEmailVerification(userModel) {
    if (!userModel) {
      throw new Error("Email does not exist.");
    }
    const detailsToCode = {
      userId: userModel._id,
    };

    const token = await createToken(detailsToCode, "1h");

    userModel.verificationToken = token;

    await userModel.save();

    return await this.emailTransporter(userModel, token);
  }

  async findUserByUsernameAndEmail(payload) {
    const existingIdentifier = await UserDAO.findUserByUsernameAndEmail({
      identifier: payload.identifier,
    });
    if (!existingIdentifier) {
      throw new Error("Invalid email, username or password, please try again.");
    }

    const isMatch = await comparePassword(
      payload.password,
      existingIdentifier.password
    );

    if (!isMatch) {
      throw new Error("Invalid email, username or password, please try again.");
    }

    const detailsToCode = {
      userId: existingIdentifier._id,
      username: existingIdentifier.username,
      email: existingIdentifier.email,
      firstName: existingIdentifier.first_name,
      lastName: existingIdentifier.last_name,
    };

    const token = await createToken(detailsToCode, "1d");

    return { token };
  }

  async findUserById(_id) {
    return await UserDAO.findUserById({
      _id,
    });
  }

  async findUserByEmail(email) {
    return await UserDAO.findUserByEmail({
      email,
    });
  }

  async verifyUser(token) {
    const decoded = await decodeToken(token);

    const user = await UserDAO.findUserById({ _id: decoded.userId });

    if (user.isVerified) {
      throw new Error("User is already verified.");
    }

    user.isVerified = true;

    user.verificationToken = null;

    return await user.save();
  }
}

module.exports = new UserService();
