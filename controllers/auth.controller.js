const { registrationSchema } = require("../validation/authValidation");
const userServices = require("../services/user.services");

const registerUser = async (req, res) => {
  try {
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    };
    console.log(userData);
    await registrationSchema.validate(userData, { abortEarly: false });
    const user = await userServices.createUser(userData);
    res.status(200).send(
      JSON.stringify({
        success: true,
        user,
        message: "User registered successfully",
      })
    );
  } catch (err) {
    res.status(500).send(
      JSON.stringify({
        success: false,
        message: err.message,
      })
    );
  }
};

module.exports = { registerUser };
