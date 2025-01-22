require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Card = require("./models/cards");
const Word = require("./models/word-of-the-day");
const Verb = require("./models/verb-of-the-day");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb connected: ${connection.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Routes
app.get("/", (req, res) => {
  res.send("Flash cards server");
});

// Get all cards
app.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a card
app.post("/addCard", async (req, res) => {
  const card = new Card({
    front: {
      language: req.body.front.language,
      content: req.body.front.content,
    },
    back: {
      language: req.body.back.language,
      content: req.body.back.content,
    },
  });

  try {
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a card
app.post("/deleteCard", async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.body.id);
    res.status(200).json({ messasge: card + " deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get daily words
app.get("/dailyWords", async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add word of the day
app.post("/addWord", async (req, res) => {
  const word = new Word({
    frenchTranslation: req.body.frenchTranslation,
    englishTranslation: req.body.englishTranslation,
    date: req.body.date,
  });

  try {
    const newWord = await word.save();
    res.status(201).json(newWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get daily verbs
app.get("/dailyVerbs", async (req, res) => {
  try {
    const verbs = await Verb.find();
    res.json(verbs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add verb of the day
app.post("/addVerb", async (req, res) => {
  const verb = new Verb({
    frenchTranslation: req.body.frenchTranslation,
    englishTranslation: req.body.englishTranslation,
    date: req.body.date,
  });

  try {
    const newVerb = await verb.save();
    res.status(201).json(newVerb);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
