const httpStatus = require("http-status");
const mongoose = require("mongoose");
const Action = require("../models/action.model");
const Role = require("../models/device.model");
const YoutubeUrl = require("../models/youtubeUrl.model");
const Proxy = require("../models/proxy.model");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/cathAsync");
const { dispathRoleFirebase } = require("../utils/firebase");
var jwt = require("jsonwebtoken");

const addNewRole = catchAsync(async (req, res) => {
  const { deviceKey, deviceName } = req.body;
  if (await Role.isRoleKeyTaken(deviceKey)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Thiết bị với mã thiết bị ${deviceKey} đã tồn tại.`
    );
  }
  try {
    await Role.create({
      _id: new mongoose.Types.ObjectId(),
      deviceKey,
      deviceName,
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
  res.json({
    status: true,
    message: "Thêm thiết bị thành công",
  });
});

const getRole = catchAsync(async (req, res) => {
  const { _id } = req.params;

  const device = await Role.findOne({ _id });

  if (!device) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Thiết bị không tồn tại.");
  }

  res.json({
    status: true,
    device,
  });
});

const getRoles = catchAsync(async (req, res) => {
  const roles = await Role.find({});

  res.json({
    status: true,
    roles,
  });
});

const updateRole = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const { deviceKey, deviceName, description } = req.body;

  const device = await Role.findOne({ _id });
  if (!device) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Thiết bị không tồn tại.");
  }

  if (await Role.isRoleKeyTaken(deviceKey, _id)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Thiết bị với mã thiết bị ${deviceKey} đã tồn tại.`
    );
  }
  try {
    await Role.updateOne(
      { _id },
      {
        deviceKey,
        deviceName,
        description,
      }
    );
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
  res.json({
    status: true,
    message: "Cập nhật thông tin thiết bị thành công",
  });
});

const deleteRole = catchAsync(async (req, res) => {
  const { _id } = req.params;

  const device = await Role.findOneAndDelete({ _id });

  if (!device) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Thiết bị không tồn tại.");
  }

  res.json({
    status: true,
    message: "Đã xoá thiết bị.",
  });
});

const runAction = catchAsync(async (req, res) => {
  let { config, roles } = req.body;
  let token = req.headers.authorization;
  let username = jwt.decode(token, process.env.SECRET_KEY).username;

  await Action.updateOne({}, config, { upsert: true });
  dispathRoleFirebase(username, roles, "run");
  res.json({
    status: true,
    message: "Đã gửi tín hiệu chạy đến các thiết bị.",
  });
});

const stopAction = catchAsync(async (req, res) => {
  let { roles } = req.body;
  let token = req.headers.authorization;
  let username = jwt.decode(token, process.env.SECRET_KEY).username;

  dispathRoleFirebase(username, roles, "stop");
  res.json({
    status: true,
    message: "Đã gửi tín hiệu dừng đến các thiết bị.",
  });
});

const getActionConfig = catchAsync(async (req, res) => {
  let action = await Action.findOne({});
  return res.json({
    status: true,
    config: action,
  });
});

const getActionAndLinks = catchAsync(async (req, res) => {
  let action = await Action.findOne({});
  if (!action) {
    return res.json({
      status: false,
      message: "Chưa thiết lập các thông tin.",
    });
  }
  let links = await YoutubeUrl.find({});
  links = links.map((item) => item.url).join("|");
  let proxys = await Proxy.find({});
  proxys = proxys.map((item) => item.proxy).join("|");
  let { like, subscribe, viewAdsTimeTo, viewAdsTimeFrom, repeat, changeEmail, changeProxy } = action;
  res.json({
    status: true,
    like,
    subscribe,
    time: `${viewAdsTimeFrom || 10}|${viewAdsTimeTo || viewAdsTimeFrom || 20}`,
    repeat: repeat || "10",
    youtubeUrl: links,
    proxy: proxys,
    changeEmail,
    changeProxy,
  });
});

module.exports = {
  addNewRole,
  updateRole,
  deleteRole,
  getRole,
  getRoles,
  runAction,
  stopAction,
  getActionConfig,
  getActionAndLinks,
};
