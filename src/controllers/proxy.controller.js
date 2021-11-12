const httpStatus = require("http-status");
const mongoose = require("mongoose");
const Proxy = require("../models/proxy.model");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/cathAsync");

const addNewProxy = catchAsync(async (req, res) => {
  const { proxy, description } = req.body;
  if (proxy.indexOf("\n") != -1) {
    let proxys = proxy.split("\n");
    for (let proxy of proxys) {
      if (await Proxy.isProxyTaken(proxy)) {
        continue;
      }
      try {
        await Proxy.create({
          _id: new mongoose.Types.ObjectId(),
          proxy,
          description,
        });
      } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
      }
    }
    return res.json({
      status: true,
      message: "Thêm nhiều proxy thành công",
    });
  }
  if (await Proxy.isProxyTaken(proxy)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Proxy ${proxy} đã tồn tại.`);
  }
  try {
    await Proxy.create({
      _id: new mongoose.Types.ObjectId(),
      proxy,
      description,
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
  res.json({
    status: true,
    message: "Thêm proxy thành công",
  });
});

const getProxy = catchAsync(async (req, res) => {
  const { _id } = req.params;

  const proxy = await Proxy.findOne({ _id });

  if (!proxy) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Proxy không tồn tại.");
  }

  res.json({
    status: true,
    proxy,
  });
});

const getProxys = catchAsync(async (req, res) => {
  const proxys = await Proxy.find({});

  res.json({
    status: true,
    proxys,
  });
});

const updateProxy = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const { proxy, description } = req.body;

  const result = await Proxy.findOne({ _id });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Proxy không tồn tại.");
  }

  if (await Proxy.isProxyTaken(proxy, _id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Proxy ${proxy} đã tồn tại.`);
  }
  try {
    await Proxy.updateOne(
      { _id },
      {
        proxy,
        description,
      }
    );
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
  res.json({
    status: true,
    message: "Cập nhật thông tin proxy thành công",
  });
});

const deleteProxy = catchAsync(async (req, res) => {
  const { _id } = req.params;

  const proxy = await Proxy.findOneAndDelete({ _id });

  if (!proxy) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Proxy không tồn tại.");
  }

  res.json({
    status: true,
    message: "Đã xoá proxy.",
  });
});

const deleteManyProxy = catchAsync(async (req, res) => {
  const { proxys } = req.body;
  await Proxy.deleteMany({ _id: proxys });

  res.json({
    status: true,
    message: "Đã xoá những proxy đã chọn.",
  });
});

module.exports = {
  addNewProxy,
  updateProxy,
  deleteProxy,
  getProxy,
  getProxys,
  deleteManyProxy,
};
