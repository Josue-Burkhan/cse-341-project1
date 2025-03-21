const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  race: { type: String, required: true },
  nickname: { type: String },
  appearance: {
    height: { type: Number },
    weight: { type: Number },
    eyeColor: { type: String },
    hairColor: { type: String },
    clothingStyle: { type: String }
  },
  personality: {
    traits: [String],
    strengths: [String],
    weaknesses: [String],
    quirks: [String]
  },
  history: {
    birthplace: { type: String },
    events: [{ year: Number, description: String }]
  },  
  relationships: {
    family: [String],
    friends: [String],
    enemies: [String],
    allies: [String],
    romance: [String]
  },
  abilities: [{
    name: { type: String, required: true },
    elements: [{ element: String, orbs: Number }]
  }],
  coreRank: { type: String, enum: ["Basic", "Beginner", "Intermediate", "Advanced", "Expert", "Legend", "Semi-God", "Divine", "God"], required: true }
}, { collection: "newworld.character"});

module.exports = mongoose.model("Character", characterSchema);