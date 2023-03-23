const mongoose = require("mongoose");

let questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["qcu", "qcm", "num"],
    required: true,
  },
  tags: [
    {
      libelle: { type: String },
    },
  ],
  libelle: { type: String, required: true },
  reponses: [
    {
      libelle: { type: String },
      isCorrect: { type: Boolean },
    },
  ],
});

module.exports = mongoose.model("Question", questionSchema);
