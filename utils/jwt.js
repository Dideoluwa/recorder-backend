const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET;

const createToken = async (tokenDetails, expiryTime) => {
  const token = jwt.sign(tokenDetails, jwt_secret, {
    expiresIn: expiryTime,
  });

  return token;
};

const decodeToken = async (token) => {
  const decoded = jwt.verify(token, jwt_secret);

  if (!decoded) {
    throw new Error("Invalid Token");
  }

  return decoded;
};

module.exports = { createToken, decodeToken };
