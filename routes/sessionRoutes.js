const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");
const { verifyToken } = require("../middleware/verifyJWT");

router
  .route("/session")
  .post(verifyToken, sessionController.createNewSession)
  .delete(verifyToken, sessionController.deleteQuestion);

router
  .route("/")
  .get(verifyToken, quizzController.getAllQuizz)
  .patch(verifyToken, quizzController.updateQuizz)
  .post(verifyToken, quizzController.createQuizz)
  .delete(verifyToken, quizzController.deleteQuizz);

router.route("/:id").get(verifyToken, quizzController.getQuizz);

module.exports = router;
