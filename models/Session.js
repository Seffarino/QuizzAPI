const mongoose = require("mongoose");

let sessionSchema = new mongoose.Schema(
  {
    session_name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    quizzId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    reponses: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        reponses: {
          type: Object,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
