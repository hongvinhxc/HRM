const mongoose = require("mongoose");

const youtubeUrlSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

youtubeUrlSchema.statics.isYoutubeUrlTaken = async function (url, excludeId) {
  const device = await this.findOne({ url, _id: { $ne: excludeId } });
  return !!device;
};

/**
 * @typedef YoutubeUrl
 */
const YoutubeUrl = mongoose.model("YoutubeUrl", youtubeUrlSchema);

module.exports = YoutubeUrl;
