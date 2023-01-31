const express = require("express");
const router = express.Router();
const quizzController = require("../controllers/quizzController");
const { verifyToken, verifyTokenAndAdmin } = require("../middleware/verifyJWT");
router
  .route("/question")
  .post(verifyToken, quizzController.addQuestion)
  .delete(verifyToken, quizzController.deleteQuestion);

router
  .route("/")
  .get(verifyToken, quizzController.getAllQuizz)
  .patch(verifyToken, quizzController.updateQuizz)
  .post(verifyToken, quizzController.createQuizz)
  .delete(verifyToken, quizzController.deleteQuizz);

router.route("/:id").get(verifyToken, quizzController.getQuizz);

module.exports = router;
