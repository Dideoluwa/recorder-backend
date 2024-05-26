const User = require("../models/user");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const registerUser = async (req, res) => {
  console.log("Registering Users....");
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(userData);

  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  const user = new User({
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    password: hashedPassword,
  });
  await user.save();

  console.log("User has been created");

  res.status(200).send(
    JSON.stringify({
      user,
      message: "User has been created",
    })
  );
};

module.exports = { registerUser };
