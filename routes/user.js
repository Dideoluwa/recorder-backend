const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  getUserDetails,
  verifyUser,
  resendEmailVerification,
} = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/authMiddleware");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/user-details", authenticateToken, getUserDetails);
userRouter.get("/verify-email/:verificationId", verifyUser);
userRouter.post("/resend-verification", resendEmailVerification);

module.exports = userRouter;
