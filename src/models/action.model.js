const mongoose = require("mongoose");

const actionSchema = mongoose.Schema({
  viewAdsTimeFrom: {
    type: String,
    required: true,
    trim: true,
  },
  viewAdsTimeTo: {
    type: String,
    required: true,
    trim: true,
  },
  like: {
    type: Boolean,
    trim: true,
  },
  subscribe: {
    type: Boolean,
    trim: true,
  },
  repeat: {
    type: String,
    trim: true,
  },
  changeProxy: {
    type: String,
    trim: true,
  },
  changeEmail: {
    type: String,
    trim: true,
  },
});

/**
 * @typedef Action
 */
const Action = mongoose.model("Action", actionSchema);

module.exports = Action;
