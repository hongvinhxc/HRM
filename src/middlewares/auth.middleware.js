const httpStatus = require("http-status");
var jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/cathAsync");

const authMiddleware = catchAsync(async (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    next();
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, err.message);
  }
});

module.exports = authMiddleware;
