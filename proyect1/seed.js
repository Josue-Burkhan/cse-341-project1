require("dotenv").config();
const mongoose = require("mongoose");
const Contact = require("./models/Contact");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedContacts = [
  {
    firstName: "Victor Eduardo",
    lastName: "Colque Pacompia",
    email: "fluxpavilion73@gmail.com",
    favoriteColor: "Green",
    birthday: "2004-02-21",
  },
  {
    firstName: "Andrea",
    lastName: "Morales",
    email: "andrea.morales@example.com",
    favoriteColor: "Skyblue",
    birthday: "1988-09-21",
  },
  {
    firstName: "Juan",
    lastName: "Martínez",
    email: "juan.martinez@example.com",
    favoriteColor: "Red",
    birthday: "2002-12-10",
  },
];

const seedDB = async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    if (collections.some(col => col.name === "contacts")) {
      await mongoose.connection.db.dropCollection("contacts");
      console.log("Collection dropped.");
    }

    await Contact.insertMany(seedContacts);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
    console.log("Connection closed.");
  }
};

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB, seeding database...");
  seedDB();
});
