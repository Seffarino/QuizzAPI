const User = require("../models/User");
const Question = require("../models/Question");

const asyncHandler = require("express-async-handler");

// @desc Get all questions from an user, the jwt middleware before create : req.userId , req.isAdmin ...
// @route GET /quizz
// @access Private
const getAllQuestions = asyncHandler(async (req, res) => {
  // Get the user
  const user = await User.findById(req.userId).populate("questions");
  const questions = await user.questions;
  if (!questions) res.status(400).json({ error: "No question found" });
  res.status(200).json(questions);
});

const getQuestion = asyncHandler(async (req, res) => {
  // Get the user
  // Get the quizzs from user
  const id = req.params.id;
  const question = await Question.findById(id);
  res.status(200).json(question);
});

// @desc Create question for an user, the jwt middleware before create : req.userId , req.isAdmin ...
// @route POST /quizz
// @access Private
const createQuestion = asyncHandler(async (req, res) => {
  const { type, libelle, reponses, tags } = req.body;
  /* Checking if the type is the common type then validation */
  if (type === "qcm" || type === "qcu") {
    if (!reponses)
      res.status(400).json({ error: "You must at least create one answer" });
    var validAnswer = false;
    for (var reponse of reponses) {
      if (reponse.isCorrect) validAnswer = true;
    }
    if (!validAnswer)
      res
        .status(400)
        .json({ error: "You must at least create one correct answer" });
  }

  const newQuestion = { type, libelle, reponses, tags };
  const createdQuestion = await Question.create(newQuestion);
  let updatedUser = await User.findOneAndUpdate(
    { _id: req.userId },
    { $push: { questions: createdQuestion } }
  );
  if (!updatedUser) res.status(404).json({ error: "User not found" });
  res
    .status(200)
    .json(
      "New question with id " +
        createdQuestion._id +
        " created for user " +
        req.userId
    );
});

// @desc Create question for an user, the jwt middleware before create : req.userId , req.isAdmin ...
// @route POST /quizz
// @access Private
const updateQuestion = asyncHandler(async (req, res) => {
  const { id, type, libelle, reponses, tags } = req.body;

  if (!id) res.status(400).json({ error: "Id required" });
  /* Checking if the type is the common type then validation */
  if (type === "qcm" || type === "qcu") {
    //TODO : replace this validation cause its duplicate above
    if (!reponses)
      res.status(400).json({ error: "You must at least create one answer" });
    var validAnswer = false;
    for (var reponse of reponses) {
      if (reponse.isCorrect) validAnswer = true;
    }
    if (!validAnswer)
      res
        .status(400)
        .json({ error: "You must at least create one correct answer" });
  }
  /* check if question exist */
  const question = await Question.findById(id).exec();
  if (!question) {
    res.status(404).json({ error: "Question not found" });
  }

  // Check for duplicate
  const duplicate = await Question.findOne({ libelle }).lean().exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate libelle" });
  }

  question.libelle = libelle;
  question.tags = tags;
  question.type = type;
  question.reponses = reponses;

  const updatedQuestion = await question.save();

  res
    .status(200)
    .json(
      "Question with id " + updatedQuestion._id + " updated for " + req.userId
    );
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Question ID Required" });
  }

  // Does the user exist to delete?
  const question = await Question.findById(id).exec();

  if (!question) {
    return res.status(400).json({ message: "Question not found" });
  }
  let updatedUser = await User.findOneAndUpdate(
    { _id: req.userId },
    { $pull: { questions: id } }
  );
  const result = await question.deleteOne();

  const reply = `User ${req.userId} for question ${result._id} deleted`;

  res.status(200).json(reply);
});

module.exports = {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
};
