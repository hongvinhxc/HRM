const httpStatus = require("http-status");
const mongoose = require("mongoose");
const YoutubeUrl = require("../models/youtubeUrl.model");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/cathAsync");

const addNewYoutubeUrl = catchAsync(async (req, res) => {
  
  const { url, description } = req.body;
  if (url.indexOf("\n") != -1) {
    let urls = url.split("\n");
    for (let url of urls) {
      if (await YoutubeUrl.isYoutubeUrlTaken(url)) {
        continue;
      }
      try {
        await YoutubeUrl.create({
          _id: new mongoose.Types.ObjectId(),
          url,
          description,
        });
      } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
      }
    }
    return res.json({
      status: true,
      message: "Thêm nhiều danh mục thành công",
    });
  }
  if (await YoutubeUrl.isYoutubeUrlTaken(url)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `danh mục ${url} đã tồn tại.`
    );
  }
  try {
    await YoutubeUrl.create({
      _id: new mongoose.Types.ObjectId(),
      url,
      description,
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
  res.json({
    status: true,
    message: "Thêm danh mục thành công",
  });
});

const getYoutubeUrl = catchAsync(async (req, res) => {
  const { _id } = req.params;

  const url = await YoutubeUrl.findOne({ _id });

  if (!url) {
    throw new ApiError(httpStatus.BAD_REQUEST, "danh mục không tồn tại.");
  }

  res.json({
    status: true,
    url,
  });
});

const getYoutubeUrls = catchAsync(async (req, res) => {
  const urls = await YoutubeUrl.find({});

  res.json({
    status: true,
    urls,
  });
});

const updateYoutubeUrl = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const { url, description } = req.body;

  const result = await YoutubeUrl.findOne({ _id });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "danh mục không tồn tại.");
  }

  if (await YoutubeUrl.isYoutubeUrlTaken(url, _id)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `danh mục ${url} đã tồn tại.`
    );
  }
  try {
    await YoutubeUrl.updateOne(
      { _id },
      {
        url,
        description,
      }
    );
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
  res.json({
    status: true,
    message: "Cập nhật thông tin danh mục thành công",
  });
});

const deleteYoutubeUrl = catchAsync(async (req, res) => {
  const { _id } = req.params;

  const url = await YoutubeUrl.findOneAndDelete({ _id });

  if (!url) {
    throw new ApiError(httpStatus.BAD_REQUEST, "danh mục không tồn tại.");
  }

  res.json({
    status: true,
    message: "Đã xoá danh mục.",
  });
});

const deleteManyYoutubeUrl = catchAsync(async (req, res) => {
  const { urls } = req.body;
  await YoutubeUrl.deleteMany({ _id: urls });

  res.json({
    status: true,
    message: "Đã xoá danh mục đã chọn.",
  });
});

module.exports = {
  addNewYoutubeUrl,
  updateYoutubeUrl,
  deleteYoutubeUrl,
  getYoutubeUrl,
  getYoutubeUrls,
  deleteManyYoutubeUrl,
};
