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
    console.log(userData);
    await registrationSchema.validate(userData, { abortEarly: false });
    const user = await userServices.createUser(userData);
    res.status(200).send({
      success: true,
      user,
      message: "User registered successfully",
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

    const { existingIdentifier, token } =
      await userServices.findUserByUsernameAndEmail(userLoginData);
    res.status(200).send({
      success: true,
      accessToken: token,
      userData: existingIdentifier,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { registerUser, loginUser };
