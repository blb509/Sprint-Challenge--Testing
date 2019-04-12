const express = require("express");
const model = require("../model/model.js");
const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello Earthling" });
});

server.get("/games", async (req, res) => {
  try {
    const rows = await model.getAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/games", async (req, res) => {
  const { title, genre } = req.body;
  if (!title) {
    return res.status(422).json({
      errorMessage: "Please provide title."
    });
  }
  if (!genre) {
    return res.status(422).json({
      errorMessage: "Please provide genre."
    });
  }

  try {
    const games = await model.insert(req.body);
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the game to the database"
    });
  }
});

module.exports = server;
