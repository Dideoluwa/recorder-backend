const {
  registrationSchema,
  loginSchema,
} = require("../validation/authValidation");
const userServices = require("../services/user.services");
const { hashPassword } = require("../utils/passwordUtils");

const registerUser = async (req, res) => {
  try {
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      username: req.body.username,
    };
    await registrationSchema.validate(userData, { abortEarly: false });
    const user = await userServices.createUser(userData);

    await userServices.sendEmailVerification(user);

    res.status(200).send({
      success: true,
      user,
      message:
        "You have registered successfully! Please check your email to verify your account.",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const userLoginData = {
      identifier: req.body.identifier,
      password: req.body.password,
    };
    await loginSchema.validate(userLoginData, { abortEarly: false });

    const { token } = await userServices.findUserByUsernameAndEmail(
      userLoginData
    );
    res.status(200).send({
      success: true,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userServices.findUserById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).send({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { verificationId } = req.params;

    await userServices.verifyUser(verificationId);

    res.status(200).send({
      success: true,
      message: "Email verified successfully!",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const resendEmailVerification = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await userServices.findUserByEmail(email);

    await userServices.sendEmailVerification(user);

    res.status(200).send({
      success: true,
      message: "Verification has been sent to your email",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  verifyUser,
  resendEmailVerification,
};
