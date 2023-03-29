const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");
const { verifyToken } = require("../middleware/verifyJWT");

router.route("/").post(verifyToken, sessionController.createNewSession);

router
  .route("/:id")
  .get(verifyToken, sessionController.getSingleSession)
  .delete(verifyToken, sessionController.deleteSession);

router.route("/quizz/:id", sessionController.getSession);
module.exports = router;
