const mongoose = require("mongoose");

//ABILITIES
const abilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  elements: [{ element: String, orbs: Number }],
  knownUsers: [String]
}, { collection: "newworld.ability" });

module.exports = mongoose.model("Ability", abilitySchema);

