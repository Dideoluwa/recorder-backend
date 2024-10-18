const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/authMiddleware");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/user-details", authenticateToken, getUserDetails);

module.exports = userRouter;
