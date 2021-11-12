const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  deviceKey: {
    type: String,
    required: true,
    trim: true,
  },
  deviceName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

deviceSchema.statics.isRoleKeyTaken = async function (deviceKey, excludeUserId) {
  const device = await this.findOne({ deviceKey, _id: { $ne: excludeUserId } });
  return !!device;
};

/**
 * @typedef Role
 */
const Role = mongoose.model("Role", deviceSchema);

module.exports = Role;
