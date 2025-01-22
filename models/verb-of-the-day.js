const mongoose = require("mongoose");

const verbSchema = new mongoose.Schema({
  frenchTranslation: {
    type: String,
    required: true,
  },
  englishTranslation: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Verb", verbSchema);
