const Session = require("../models/Session");
const Quizz = require("../models/Quizz");

const asyncHandler = require("express-async-handler");
// @desc Get a single session from the quizzId
// @route GET /session/:quizzId
// @access Private
const getSingleSession = asyncHandler(async (req, res) => {
  // Get the session
  const id = req.params.id;
  const session = await Session.findById(id);
  res.status(200).json(session);
});
// @desc Get a session from the quizzId
// @route GET /session/:quizzId
// @access Private
const getSession = asyncHandler(async (req, res) => {
  // Get the session
  const id = req.params.id;
  const quizz = await Quizz.findById(id);
  if (!quizz) res.status(400).json("Quizz not found");
  const sessions = await Session.find({ quizzId: id }).exec();
  res.status(200).json(sessions);
});
// @desc Create new session
// @route POST /session
// @access Private
const createNewSession = asyncHandler(async (req, res) => {
  const { session_name, reponses, quizz_id } = req.body;

  // Confirm data
  if (!session_name || !quizz_id || !reponses) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sessionObject = { session_name, reponses, quizzId: quizz_id };

  // Create and store new user
  const session = await Session.create(sessionObject);

  if (session) {
    //created
    res.status(201).json({ message: `New session ${session_name} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// @desc Delete a session
// @route DELETE /session/:id
// @access Private
// TODO : delete a session

const deleteSession = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Session ID Required" });
  }

  // Does the user exist to delete?
  const session = await Session.findById(id).exec();

  if (!session) {
    return res.status(400).json({ message: "Session not found" });
  }

  const result = await Session.deleteOne();

  const reply = `Session ${session.session_name} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  createNewSession,
  deleteSession,
  getSession,
  getSingleSession,
};
