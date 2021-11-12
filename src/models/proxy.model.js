const mongoose = require("mongoose");

const proxySchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  proxy: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

proxySchema.statics.isProxyTaken = async function (proxy, excludeId) {
  const device = await this.findOne({ proxy, _id: { $ne: excludeId } });
  return !!device;
};

/**
 * @typedef Proxy
 */
const Proxy = mongoose.model("Proxy", proxySchema);

module.exports = Proxy;
