const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    return next(new Error("Please provide username, email and password"));
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    return next(new Error("User already exists"));
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    generateToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    return next(new Error("Please provide email and password"));
  }

  // Check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(400);
    return next(new Error("User does not exists"));
  }

  try {
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(400);
      return next(new Error("User password does not match"));
    }

    generateToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    return next(new Error("Please provide email"));
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    return next(new Error("User does not exists"));
  }

  try {
    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        html: message,
      });
      return res.status(200).json({
        success: true,
        message: "Email was sent!",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      res.status(500);
      return next(new Error("Email could not be sent"));
    }
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    res.status(400);
    return next(new Error("Please provide new password"));
  }

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      return next(new Error("Invalid Reset Token"));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Password Reset Success",
    });
  } catch (error) {
    next(error);
  }
};

const generateToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  return res.status(statusCode).json({
    success: true,
    token,
  });
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
