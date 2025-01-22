const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  front: {
    type: {
      language: String,
      content: String,
    },
    required: true,
  },
  back: {
    type: {
      language: String,
      content: String,
    },
    required: true,
  },
});

module.exports = mongoose.model("Card", cardSchema);
