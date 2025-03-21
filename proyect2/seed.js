require("dotenv").config();
const mongoose = require("mongoose");
const Character = require("./models/Character");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedCharacters = [
  {
    name: "Drake",
    age: 35,
    gender: "Male",
    race: "Dragontine",
    nickname: "Drake",
    appearance: {
      height: 1.6, // En metros, sin "m"
      weight: 60, // En kg, sin "kg"
      eyeColor: "Gold",
      hairColor: "White",
      clothingStyle: "Warrior Style",
    },
    personality: {
      traits: ["Dragontine"],
      strengths: ["Intelligence"],
      weaknesses: ["His mind"],
      quirks: ["A 40 years old man"],
    },
    history: {
      birthplace: "Alister Kingdom",
      events: [
        { year: 215, description: "Born in the desert" }, // year como Number
      ],
    },
    relationships: {
      family: [],
      friends: [],
      enemies: [],
      allies: [],
      romance: [],
    },
    abilities: [
      {
        name: "Fire Breath",
        elements: [{ element: "Fire", orbs: 3 }],
      },
    ],
    coreRank: "Expert",
  },
];

const seedDB = async () => {
  try {
    await Character.deleteMany({}); // Elimina todos los registros existentes
    await Character.insertMany(seedCharacters);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB, seeding database...");
  seedDB();
});
