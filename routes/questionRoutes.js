const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const { verifyToken, verifyTokenAndAdmin } = require("../middleware/verifyJWT");

router
  .route("/")
  .get(verifyToken, questionController.getAllQuestions)
  .post(verifyToken, questionController.createQuestion)
  .patch(verifyToken, questionController.updateQuestion)
  .delete(verifyToken, questionController.deleteQuestion);
router.route("/:id").get(verifyToken, questionController.getQuestion);
module.exports = router;
