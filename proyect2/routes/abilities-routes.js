const express = require("express");
const router = express.Router();
const Ability = require("../models/Ability");

// GET 
router.get("/", async (req, res) => {
  try {
    const abilities = await Ability.find();
    res.json(abilities);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving abilities", error });
  }
});

// GET 
router.get("/:id", async (req, res) => {
  try {
    const ability = await Ability.findById(req.params.id);
    if (!ability) return res.status(404).json({ message: "Ability not found" });
    res.json(ability);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// POST 
router.post("/", async (req, res) => {
  try {
    const newAbility = new Ability(req.body);
    await newAbility.save();
    res.status(201).json(newAbility);
  } catch (error) {
    res.status(400).json({ message: "Error creating ability", error });
  }
});

// PUT 
router.put("/:id", async (req, res) => {
  try {
    const updatedAbility = await Ability.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAbility) return res.status(404).json({ message: "Ability not found" });
    res.json(updatedAbility);
  } catch (error) {
    res.status(400).json({ message: "Error updating ability", error });
  }
});

// DELETE 
router.delete("/:id", async (req, res) => {
  try {
    const deletedAbility = await Ability.findByIdAndDelete(req.params.id);
    if (!deletedAbility) return res.status(404).json({ message: "Ability not found" });
    res.json({ message: "Ability deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ability", error });
  }
});

module.exports = router;
