const express = require("express");
const youtubeUrlController = require("../controllers/youtubeUrl.controller");

const router = express.Router();

router
  .route("/")
  .get(youtubeUrlController.getYoutubeUrls)
  .post(youtubeUrlController.addNewYoutubeUrl);

router
  .route("/:_id")
  .get(youtubeUrlController.getYoutubeUrl)
  .patch(youtubeUrlController.updateYoutubeUrl)
  .delete(youtubeUrlController.deleteYoutubeUrl);

router
  .route("/delete-many")
  .post(youtubeUrlController.deleteManyYoutubeUrl);

module.exports = router;
