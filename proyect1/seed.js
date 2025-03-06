require("dotenv").config();
const mongoose = require("mongoose");
const Contact = require("./models/Contact"); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedContacts = [
  { name: "Mario", phoneNumber: "992921921", email: "mario@example.com" },
  { name: "Luigi", phoneNumber: "993838383", email: "luigi@example.com" },
  { name: "Peach", phoneNumber: "994949494", email: "peach@example.com" },
];

const seedDB = async () => {
  try {
    await Contact.deleteMany();
    await Contact.insertMany(seedContacts);
    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDB();
