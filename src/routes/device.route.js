const express = require("express");
const deviceController = require("../controllers/device.controller");

const router = express.Router();

router
  .route("/")
  .get(deviceController.getRoles)
  .post(deviceController.addNewRole);
  
router.route("/run-action").post(deviceController.runAction);
router.route("/stop-action").post(deviceController.stopAction);
router.route("/get-action-config").get(deviceController.getActionConfig);

router
  .route("/:_id")
  .get(deviceController.getRole)
  .patch(deviceController.updateRole)
  .delete(deviceController.deleteRole);

module.exports = router;
