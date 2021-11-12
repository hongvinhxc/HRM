const httpStatus = require("http-status");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/cathAsync");
const jwt = require("jsonwebtoken");

const login = catchAsync(async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await user.isPasswordMatch(req.body.password))) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Tài khoản hoặc mật khẩu không chính xác."
    );
  }
  const token = jwt.sign(
    {
      username: req.body.username,
    },
    process.env.SECRET_KEY
  );
  res.json({
    success: true,
    token,
    message: "Đăng nhập thành công.",
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await user.isPasswordMatch(req.body.password))) {
    return res.json({
      success: false,
      message: "Mật khẩu không chính xác",
    });
  }
  if (req.body.newPassword !== req.body.confirmNewPassword) {
    return res.json({
      success: false,
      message: "Mật khẩu xác nhận không khớp.",
    });
  }
  await User.updateOne(
    {
      username: req.body.username,
    },
    {
      password: req.body.newPassword,
    },
  );
  res.json({
    success: true,
    message: "Đã thay đổi mật khẩu.",
  });
});

module.exports = {
  login,
  changePassword,
};
