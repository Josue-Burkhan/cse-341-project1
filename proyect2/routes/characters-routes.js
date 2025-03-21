const express = require("express");
const router = express.Router();
const Character = require("../models/Character");

//GET ALL
router.get("/", async (req, res) => {
  // #swagger.summary = 'Get all characters'
  // #swagger.description = 'Returns a list of all characters'
  // #swagger.responses[200] = { description: 'Successful response' }
  // #swagger.responses[500] = { description: 'Internal Server Error' }
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving characters", error });
  }
});

// GET  ID
router.get("/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) return res.status(404).json({ message: "Character not found" });
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// POST ID
router.post("/", async (req, res) => {
  try {
    const newCharacter = new Character(req.body);
    await newCharacter.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).json({ message: "Error creating character", error });
  }
});

// PUT 
router.put("/:id", async (req, res) => {
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCharacter) return res.status(404).json({ message: "Character not found" });
    res.json(updatedCharacter);
  } catch (error) {
    res.status(400).json({ message: "Error updating character", error });
  }
});

// DELETE 
router.delete("/:id", async (req, res) => {
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    if (!deletedCharacter) return res.status(404).json({ message: "Character not found" });
    res.json({ message: "Character deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting character", error });
  }
});

module.exports = router;
