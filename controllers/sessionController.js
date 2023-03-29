const Session = require("../models/Session");
const asyncHandler = require("express-async-handler");

// @desc Get all sessions
// @route GET /sessions
// @access Private
const getAllSessions = asyncHandler(async (req, res) => {
  // Get all users from MongoDB
  const sessions = await Sessions.find().exec();

  // If no users
  if (!sessions?.length) {
    return res.status(400).json({ message: "No sessions found" });
  }

  res.status(200).json(sessions);
});

// @desc Get a session
// @route GET /session
// @access Private
const getSession = asyncHandler(async (req, res) => {
  // Get the session
  const id = req.params.id;
  const session = await Session.findById(id);
  if (!session) res.status(400).json("Session ID not found");
  res.status(200).json(session);
});
// @desc Create new session
// @route POST /session
// @access Private
const createNewSession = asyncHandler(async (req, res) => {
  const { session_name, date, reponses } = req.body;

  // Confirm data
  if (!session_name || !date || !reponses) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sessionObject = { session_name, date, reponses };

  // Create and store new user
  const user = await Session.create(sessionObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${session_name} created` });
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
  getAllSessions,
  createNewSession,
  deleteSession,
  getSession,
};