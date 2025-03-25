const mongoose = require("mongoose");

//ABILITIES
const abilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  elements: [
    {
      element: { type: String, required: true },
      orbs: { type: Number, required: true },
      _id: false
    }
  ],
  knownUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},
  { collection: "newworld.ability" }
);

module.exports = mongoose.model("Ability", abilitySchema);

