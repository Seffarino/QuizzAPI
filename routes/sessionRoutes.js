const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");
const { verifyToken } = require("../middleware/verifyJWT");

router
  .route("/")
  .get(verifyToken, sessionController.getAllSessions)
  .post(verifyToken, sessionController.createNewSession);

router
  .route("/:id")
  .get(verifyToken, sessionController.getSession)
  .patch(verifyToken, sessionController.deleteSession);

module.exports = router;
