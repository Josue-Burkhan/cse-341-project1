require("dotenv").config();
const mongoose = require("mongoose");
const Contact = require("./models/Contact"); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedContacts = [
  {
    _id: "67ca272d198e2c47c723a9d0",
    email: "carlos.rojas@example.com",
    username: "carlos_rojas",
    name: "Carlos Rojas",
    ipAddress: "192.168.1.10",
  },
  {
    _id: "67ca272d198e2c47c723a9d1",
    email: "andrea.morales@example.com",
    username: "andrea_morales",
    name: "Andrea Morales",
    ipAddress: "192.168.1.11",
  },
  {
    _id: "67ca272d198e2c47c723a9d2",
    email: "juan.martinez@example.com",
    username: "juan_martinez",
    name: "Juan Martínez",
    ipAddress: "192.168.1.12",
  },
];


const seedDB = async () => {
  try {
    await mongoose.connection.db.dropCollection("contacts").catch(err => console.log("Collection does not exist."));
    await Contact.insertMany(seedContacts);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
    console.log("Connection closed.");
  }
};



seedDB();
