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
    reponses: Array
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
