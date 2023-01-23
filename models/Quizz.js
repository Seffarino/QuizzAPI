const mongoose = require("mongoose");

let quizzSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  questions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
      unique: true,
    },
  ],
});

module.exports = mongoose.model("Quizz", quizzSchema);
