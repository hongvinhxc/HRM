const express = require("express");
const proxyController = require("../controllers/proxy.controller");

const router = express.Router();

router
  .route("/")
  .get(proxyController.getProxys)
  .post(proxyController.addNewProxy);

router
  .route("/:_id")
  .get(proxyController.getProxy)
  .patch(proxyController.updateProxy)
  .delete(proxyController.deleteProxy);

router
  .route("/delete-many")
  .post(proxyController.deleteManyProxy);

module.exports = router;
