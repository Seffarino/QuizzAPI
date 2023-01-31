const User = require("../models/User");
const Quizz = require("../models/Quizz");
const Question = require("../models/Question");

const asyncHandler = require("express-async-handler");

// @desc Get all quizz from an user the user infos are get from the previous middleware which verify the jwt
// @route GET /quizz
// @access Private
const getAllQuizz = asyncHandler(async (req, res) => {
  // Get the quizzs from user
  const user = await User.findById(req.userId).populate("quizzs");
  const quizzs = await user.quizzs;
  if (!quizzs) res.status(404).json({ error: "No quizz found" });
  res.status(200).json(quizzs);
});

// @desc Get a quizz from an user with an id
// @route GET /quizz
// @access Private
const getQuizz = asyncHandler(async (req, res) => {
  // Get the quizzs from user
  const id = req.params.id;
  const quizz = await Quizz.findById(id);
  res.status(200).json(quizz);
});

// @desc Create an empty quizz the user infos are get from the previous middleware which verify the jwt : req.userId
// @route POST /quizz
// @access Private
const createQuizz = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const newQuizz = { name, description };
  const createdQuizz = await Quizz.create(newQuizz);
  let updatedUser = await User.findOneAndUpdate(
    { _id: req.userId },
    { $push: { quizzs: createdQuizz } }
  );

  res.status(200).json("New quizz " + name + " created for user " + req.email);
});

// @desc Update a quizz , previous middleware which verify the jwt : req.userId
// @route PATCH /quizz
// @access Private
const updateQuizz = asyncHandler(async (req, res) => {
  const { id, name, description } = req.body;

  if (!id) res.status(400).json({ error: "Id required" });

  let quizz = await Quizz.findById(id).exec();
  if (!quizz) res.status(404).json({ error: "No quizz found" });

  // Check for duplicate
  const duplicate = await Quizz.findOne({ name }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate name" });
  }

  quizz.name = name;
  quizz.description = description;

  const updatedQuizz = await quizz.save();

  res.status(200).json("Quizz " + name + " updated " + req.email);
});
// @desc Delete quizz
// @route DELETE /quizz
// @access Private
const deleteQuizz = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Quizz ID Required" });
  }

  // Does the user exist to delete?
  const quizz = await Quizz.findById(id).exec();

  if (!quizz) {
    return res.status(400).json({ message: "Quizz not found" });
  }
  let updatedQuizz = await User.findOneAndUpdate(
    { _id: req.userId },
    { $pull: { quizzs: id } }
  );
  const result = await quizz.deleteOne();

  const reply = `User ${req.userId} for quizz ${result._id} deleted`;

  res.status(200).json(reply);
});
// @desc Add a question to a quizz
// @route POST /quizz/question
// @access Private
const addQuestion = asyncHandler(async (req, res) => {
  const { quizzId, questionId } = req.body;
  /* TODO : remove these validation and create a middleware */
  // Data validation 2 id needed
  if (!quizzId) {
    return res.status(400).json({ message: "Quizz ID Required" });
  }

  if (!questionId) {
    return res.status(400).json({ message: "Question ID Required" });
  }

  // Does the quizz exist ?
  const quizz = await Quizz.findById(quizzId).populate("questions");
  if (!quizz) {
    return res.status(400).json({ message: "Quizz not found" });
  }

  //Does the question exist ?
  const question = await Question.findById(questionId).exec();

  if (!question) {
    return res.status(400).json({ message: "question not found" });
  }

  //check for duplicate
  const duplicate = await Quizz.findOne({ questions: questionId });
  if (duplicate)
    return res.status(400).json({ message: "Duplicate question not allowed" });
  let updatedQuizz = await Quizz.findOneAndUpdate(
    { _id: quizzId },
    { $push: { questions: questionId } }
  );

  const reply = `Added question ${questionId} to quizz ${quizzId}`;
  res.status(200).json(reply);
});
// @desc Remove a question from a quizz
// @route DELETE /quizz
// @access Private
const deleteQuestion = asyncHandler(async (req, res) => {
  const { quizzId, questionId } = req.body;
  /* TODO : remove these validation and create a middleware */
  // Data validation 2 id needed
  if (!quizzId) {
    return res.status(400).json({ message: "Quizz ID Required" });
  }

  if (!questionId) {
    return res.status(400).json({ message: "Question ID Required" });
  }

  // Does the quizz exist ?
  const quizz = await Quizz.findById(quizzId).populate("questions");
  if (!quizz) {
    return res.status(400).json({ message: "Quizz not found" });
  }

  //Does the question exist ?
  const question = await Question.findById(questionId).exec();

  if (!question) {
    return res.status(400).json({ message: "question not found" });
  }

  let updatedQuizz = await Quizz.findOneAndUpdate(
    { _id: quizzId },
    { $pull: { questions: questionId } }
  );

  const reply = `Removed question ${questionId} from quizz ${quizzId}`;
  res.status(200).json(reply);
});
module.exports = {
  getAllQuizz,
  createQuizz,
  updateQuizz,
  deleteQuizz,
  addQuestion,
  deleteQuestion,
  getQuizz,
};
