const express = require("express");
const deviceController = require("../controllers/device.controller");

const router = express.Router();

router
  .route("/")
  .post(deviceController.getActionAndLinks)

module.exports = router;
